<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ClassSubject;
use App\Models\ClassSubjectPlan;
use App\Models\Grade;
use App\Models\Section;
use App\Models\Student;
use App\Models\SubjectComponent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GradeController extends Controller
{
    /**
     * جلب هيكل جدول الدرجات بناءً على الفلترة والصلاحيات
     */
    public function getGradeGrid(Request $request)
    {
        $request->validate([
            'section_id' => 'required|exists:sections,id',
        ]);

        $user = Auth::user();
        $sectionId = $request->section_id;

        // 1. التحقق من الصلاحيات: إذا كان ناظر (Supervisor)، هل هذه الشعبة تابعة له؟
        $section = Section::with('schoolClass')->findOrFail($sectionId);

        if ($user->hasRole('supervisor') && $section->supervisor_id !== $user->id) {
            return response()->json(['error' => 'غير مصرح لك بعرض بيانات هذه الشعبة.'], 403);
        }

        // 2. جلب خطة المواد الخاصة بصف هذه الشعبة لمعرفة المواد المفعلة والحد الأقصى للعلامات
        $subjectPlans = ClassSubjectPlan::where('class_id', $section->class_id)
            ->with('subject')
            ->get();

        // 3. جلب الطلاب في هذه الشعبة مع علاماتهم الحالية المرتبطة بالخطط المفعلة
        $students = Student::where('section_id', $sectionId)
            ->with(['grades' => function ($query) use ($subjectPlans) {
                $query->whereIn('plan_id', $subjectPlans->pluck('id'));
            }])
            ->get();

        // 4. تنسيق البيانات لتعود بشكل مريح للـ React Grid
        return response()->json([
            'section_info' => [
                'name' => $section->section_name,
                'class_name' => $section->schoolClass->class_name
            ],
            'columns_subjects' => $subjectPlans->map(function ($plan) {
                return [
                    'plan_id' => $plan->id,
                    'subject_name' => $plan->subject->subject_name,
                    'limits' => [
                        'first_term' => ['max' => $plan->max_first_term, 'active' => $plan->is_first_term_active],
                        'second_term' => ['max' => $plan->max_second_term, 'active' => $plan->is_second_term_active],
                        'final' => ['max' => $plan->max_final, 'active' => $plan->is_final_active],
                    ]
                ];
            }),
            'students_data' => $students->map(function ($student) {
                return [
                    'student_id' => $student->id,
                    'student_name' => $student->student_name,
                    'scores' => $student->grades->keyBy('plan_id')->map(function ($grade) {
                        return [
                            'first_term_score' => $grade->first_term_score,
                            'second_term_score' => $grade->second_term_score,
                            'final_score' => $grade->final_score,
                        ];
                    })
                ];
            })
        ]);
    }

    /**
     * حفظ ورصد العلامات بشكل جماعي (Bulk Update)
     */
    public function saveAllGrades(Request $request)
    {
        // return response()->json(['data' => $request->all()]);
        // 1. التثبت من البيانات المرسلة
        $request->validate([
            'exam_id' => 'required|exists:assessment_types,id',
            'students' => 'required|array',
            'students.*.student_id' => 'required|exists:students,id',
            'students.*.grades' => 'required|array',
        ]);

        $user = Auth::user();

        if (!$user->hasPermissionTo('edit grades')) {
            return response()->json(['error' => 'لا تملك صلاحية تعديل ورصد العلامات.'], 403);
        }

        $assessmentTypeId = $request->input('exam_id');

        foreach ($request->students as $studentData) {
            $studentId = $studentData['student_id'] ?? null;
            if (!$studentId) continue;

            $student = Student::find($studentId);
            if (!$student) continue;

            // حماية الناظر / المشرف
            if ($user->hasRole('supervisor')) {
                $section = Section::find($student->section_id);
                if (!$section || $section->supervisor_id !== $user->id) {
                    continue;
                }
            }

           foreach ($studentData['grades'] as $item) {
    $score = $item['grade'] ?? null;

    // 🛑 1. تخطي العلامات الفارغة (null أو "")
    if (is_null($score) || $score === '') {
        continue;
    }

    $classSubjectId = $item['class_subject_id'] ?? null;
    if (!$classSubjectId) continue;

    $classSubject = ClassSubject::with('subject')->find($classSubjectId);
    if (!$classSubject) continue;

    $studentName = $student->student_name ?? "الطالب رقم {$student->id}";
    $subjectName = $classSubject->subject->subject_name ?? "المادة رقم {$classSubject->id}";

    // 🛑 2. رفض العلامات السالبة
    if (!is_numeric($score) || (float) $score < 0) {
        return response()->json([
            'error' => "العلامة المدخلة ({$score}) للطالب ({$studentName}) في المادة ({$subjectName}) غير صالحة. لا يمكن إدخال علامة سالبة."
        ], 422);
    }

    // 🛑 3. التحقق من السقف الأعلى للمكون (إذا وجد)
    $componentId = $item['subject_component_id'] ?? null;
    if ($componentId) {
        $component = SubjectComponent::find($componentId);
        if ($component && $score > $component->max_component_score) {
            return response()->json([
                'error' => "العلامة المدخلة ({$score}) للطالب ({$studentName}) في الجزء ({$component->component_name}) تتجاوز الحد الأقصى وهو ({$component->max_component_score})."
            ], 422);
        }
    }

                // 🛑 3. البحث والتحديث الآمن مع دعم الحقول التي تقبل null
                $attributes = [
                    'student_id'           => (int) $studentId,
                    'class_subject_id'     => (int) $classSubjectId,
                    'assessment_type_id'   => (int) $assessmentTypeId,
                    'subject_component_id' => $componentId ? (int) $componentId : null,
                ];

                // نحدد القيم المراد حفظها في حال التحديث أو الإنشاء
                $values = [
                    'score' => $score,
                ];

                Grade::updateOrCreate($attributes, $values);
            }
        }

        return response()->json(['message' => 'تم حفظ ورصد العلامات بنجاح']);
    }
}
