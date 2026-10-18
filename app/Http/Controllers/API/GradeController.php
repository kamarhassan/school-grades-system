<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveAllGradesRequest;
use App\Models\ClassSubject;
use App\Models\ClassSubjectPlan;
use App\Models\Grade;
use App\Models\Section;
use App\Models\Student;
use App\Models\SubjectComponent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class GradeController extends Controller
{
    /**
     * جلب هيكل جدول الدرجات بناءً على الفلترة والصلاحيات
     */
    public function getGradeGrid(Request $request)
    {
        $data = $request->validate([
            'section_id' => ['required', 'integer', 'exists:sections,id'],
            'exam_id'    => ['required', 'integer', 'exists:assessment_types,id'],
        ]);

        $user    = $request->user();
        $section = Section::findOrFail($data['section_id']);

        if ($user->hasRole('supervisor') && (int) $section->supervisor_id !== (int) $user->id) {
            return response()->json(['error' => 'غير مصرح لك بعرض بيانات هذه الشعبة.'], 403);
        }

        // مواد الصف
        $classSubjects = ClassSubject::where('class_id', $section->class_id)
            ->with('subject')
            ->get();

        // مكونات هذا الامتحان فقط، مجمّعة حسب المادة الأساسية
        $componentsBySubject = SubjectComponent::where('assessment_type_id', $data['exam_id'])
            ->whereIn('subject_id', $classSubjects->pluck('subject_id'))
            ->get()
            ->groupBy('subject_id');

        // قالب الأعمدة: مادة بدون مكونات = عمود واحد، وإلا عمود لكل مكوّن
        $columns = [];
        foreach ($classSubjects as $cs) {
            $components = $componentsBySubject->get($cs->subject_id);

            if ($components && $components->isNotEmpty()) {
                foreach ($components as $component) {
                    $columns[] = [
                        'class_subject_id'     => $cs->id,
                        'subject_component_id' => $component->id,
                        'subject_name'         => $cs->subject->subject_name,
                        'component_name'       => $component->component_name,
                        'max'                  => $component->max_component_score,
                    ];
                }
            } else {
                $columns[] = [
                    'class_subject_id'     => $cs->id,
                    'subject_component_id' => null,
                    'subject_name'         => $cs->subject->subject_name,
                    'component_name'       => null,
                    'max'                  => $cs->max_score,
                ];
            }
        }

        // الطلاب مع درجاتهم المحفوظة لهذا الامتحان
        $students = Student::where('section_id', $section->id)
            ->with(['grades' => fn($q) => $q->where('exam_id', $data['exam_id'])])
            ->get();

        $studentsData = $students->map(function ($student) use ($columns) {
            $saved = $student->grades->keyBy(
                fn($g) => $g->class_subject_id . '-' . ($g->subject_component_id ?? 0)
            );

            return [
                'student_id'   => $student->id,
                'student_name' => $student->student_name,
                'grades'       => collect($columns)->map(function ($col) use ($saved) {
                    $key = $col['class_subject_id'] . '-' . ($col['subject_component_id'] ?? 0);
                    $score = optional($saved->get($key))->score;

                    return [
                        'class_subject_id'     => $col['class_subject_id'],
                        'subject_component_id' => $col['subject_component_id'],
                        'grade'                => $score !== null ? (float) $score : null,
                    ];
                })->values(),
            ];
        });

        return response()->json([
            'message' => [
                'class_id'   => $section->class_id,
                'section_id' => $section->id,
                'exam_id'    => (int) $data['exam_id'],
                'columns'    => $columns,
                'students'   => $studentsData,
            ],
        ]);
    }

    /**
     * حفظ ورصد العلامات بشكل جماعي (Bulk Update)
     */

    public function saveAllGrades(SaveAllGradesRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = $request->user();

        // 1) حماية الناظر: مرة واحدة على الشعبة، وبرفض صريح
        if ($user->hasRole('supervisor')) {
            $ownsSection = Section::whereKey($data['section_id'])
                ->where('supervisor_id', $user->id)
                ->exists();

            abort_unless($ownsSection, 403, 'لا تملك صلاحية رصد علامات هذه الشعبة.');
        }

        // 2) تحميل كل ما نحتاجه باستعلامات قليلة بدل استعلام لكل عنصر
        $studentIds = collect($data['students'])->pluck('student_id')->unique();

        $subjectIds = collect($data['students'])
            ->flatMap(fn($s) => collect($s['grades'])->pluck('class_subject_id'))
            ->unique();

        $componentIds = collect($data['students'])
            ->flatMap(fn($s) => collect($s['grades'])->pluck('subject_component_id'))
            ->filter()
            ->unique();

        $validStudentIds = Student::whereIn('id', $studentIds)
            ->where('section_id', $data['section_id'])
            ->pluck('id')
            ->flip();

        $classSubjects = ClassSubject::whereIn('id', $subjectIds)
            ->where('class_id', $data['class_id'])
            ->get()
            ->keyBy('id');

        $components = SubjectComponent::whereIn('id', $componentIds)
            ->get()
            ->keyBy('id');

        // 3) تحقق كامل قبل أي كتابة، وتجميع كل الأخطاء دفعة واحدة
        $errors = [];
        $rows   = [];

        foreach ($data['students'] as $sIndex => $studentData) {
            $studentId = $studentData['student_id'];

            if (!$validStudentIds->has($studentId)) {
                $errors["students.$sIndex.student_id"] = "الطالب ($studentId) لا ينتمي لهذه الشعبة.";
                continue;
            }

            foreach ($studentData['grades'] as $gIndex => $g) {
                $path = "students.$sIndex.grades.$gIndex";

                $subject = $classSubjects->get($g['class_subject_id']);
                if (!$subject) {
                    $errors["$path.class_subject_id"] = 'المادة لا تتبع هذا الصف.';
                    continue;
                }

                $componentId = $g['subject_component_id'] ?? null;
                $max = $subject->max_score;

                if ($componentId) {
                    $component = $components->get($componentId);

                    $belongs = $component
                        && (int) $component->subject_id === (int) $subject->subject_id
                        && (int) $component->assessment_type_id === (int) $data['exam_id'];

                    if (!$belongs) {
                        $errors["$path.subject_component_id"] = 'الجزء لا يتبع هذه المادة أو هذا الامتحان.';
                        continue;
                    }

                    $max = $component->max_component_score;
                }

                // $score = $g['score'] ?? null;
                $score = $g['grade'] ?? null;

                if ($score !== null && $max !== null && $score > $max) {
                    $errors["$path.score"] = "العلامة ($score) تتجاوز الحد الأقصى ($max).";
                    continue;
                }

                $rows[] = [
                    'student_id'           => $studentId,
                    'class_subject_id'     => $subject->id,
                    'subject_component_id' => $componentId,
                    'score'                => $score,
                ];
            }
        }

        if ($errors) {
            throw ValidationException::withMessages($errors);   // 422
        }

        // 4) الكتابة في transaction واحدة
        $stats = ['saved' => 0, 'deleted' => 0];

        // نتجاهل الخانات الفارغة: null لا يعني "امسح" بل "لم تُلمس"
        $now = now();

        $payload = collect($rows)
            ->filter(fn($r) => $r['score'] !== null)
            ->map(fn($r) => [
                'exam_id'              => $data['exam_id'],
                'assessment_type_id'   => $data['exam_id'],
                'student_id'           => $r['student_id'],
                'class_subject_id'     => $r['class_subject_id'],
                'subject_component_id' => $r['subject_component_id'],
                'class_id'             => $data['class_id'],
                'section_id'           => $data['section_id'],
                'score'                => $r['score'],
                'created_at'           => $now,
                'updated_at'           => $now,
            ])
            ->values();

        DB::transaction(function () use ($payload) {
            foreach ($payload->chunk(500) as $chunk) {
                Grade::upsert(
                    $chunk->all(),
                    ['exam_id', 'student_id', 'class_subject_id', 'subject_component_id'],
                    ['class_id', 'section_id', 'score', 'updated_at']
                );
            }
        });

        return response()->json([
            'message' => 'تم حفظ ورصد العلامات بنجاح',
            'saved'   => $payload->count(),
        ]);

        return response()->json([
            'message' => 'تم حفظ ورصد العلامات بنجاح',
            'saved'   => $stats['saved'],
            'deleted' => $stats['deleted'],
        ]);
    }
}
