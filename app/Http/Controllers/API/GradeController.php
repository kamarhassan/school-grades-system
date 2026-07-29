<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ClassSubjectPlan;
use App\Models\Grade;
use App\Models\Section;
use App\Models\Student;
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

return response()->json(['message' => 'تم حفظ ورصد العلامات بنجاح', 'data' => $request->all()]);


        $request->validate([
            'grades' => 'required|array',
            'grades.*.student_id' => 'required|exists:students,id',
            'grades.*.plan_id' => 'required|exists:class_subject_plans,id',
            'grades.*.term' => 'required|in:first_term,second_term,final',
            'grades.*.score' => 'nullable|numeric|min:0',
        ]);

        $user = Auth::user();

        // التحقق الإجمالي من صلاحية التعديل
        if (!$user->hasPermissionTo('edit grades')) {
            return response()->json(['error' => 'لا تملك صلاحية تعديل ورصد العلامات.'], 403);
        }

        foreach ($request->grades as $item) {
            $plan = ClassSubjectPlan::findOrFail($item['plan_id']);
            $student = Student::findOrFail($item['student_id']);

            // حماية إضافية للناظر للتأكد من أن الطالب يتبع شعبة يشرف عليها
            if ($user->hasRole('supervisor')) {
                $section = Section::find($student->section_id);
                if ($section->supervisor_id !== $user->id) {
                    continue; // تخطي السجل غير المصرح به
                }
            }

            // التحقق من السقف الكلي والتأكد أن الجزء (السعي) مفعل حالياً من الإدارة
            if ($item['term'] == 'first_term') {
                if (!$plan->is_first_term_active || $item['score'] > $plan->max_first_term) return response()->json(['error' => "العلامة تتجاوز الحد الأقصى أو أن الفصل الدراسي مجمد للمادة: {$plan->id}"], 422);
                $field = 'first_term_score';
            } elseif ($item['term'] == 'second_term') {
                if (!$plan->is_second_term_active || $item['score'] > $plan->max_second_term) return response()->json(['error' => "العلامة تتجاوز الحد الأقصى أو أن الفصل الدراسي مجمد للمادة: {$plan->id}"], 422);
                $field = 'second_term_score';
            } else {
                if (!$plan->is_final_active || $item['score'] > $plan->max_final) return response()->json(['error' => "العلامة تتجاوز الحد الأقصى أو أن الامتحان النهائي مجمد للمادة: {$plan->id}"], 422);
                $field = 'final_score';
            }

            // تحديث السجل أو إنشائه إن لم يكن موجوداً
            Grade::updateOrCreate(
                ['student_id' => $item['student_id'], 'plan_id' => $item['plan_id']],
                [$field => $item['score']]
            );
        }

        return response()->json(['message' => 'تم حفظ ورصد العلامات بنجاح']);
    }
}
