<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ClassSubjectPlan;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentsController extends Controller
{
    public function getStudentsByClassAndSection(Request $request)
    {
        $classId = $request->input('class_id');
        $sectionId = $request->input('section_id');

        // 1. جلب جميع المواد المخططة لهذا الصف في السنة الحالية أولاً (حتى نعرف الأعمدة)
        $subjectPlans = ClassSubjectPlan::where('class_id', $classId)
            ->whereHas('academicYear', function ($q) {
                $q->where('is_current', 1);
            })
            ->with('subject:id,subject_name')
            ->get();

        // 2. جلب الطلاب مع علاماتهم الموجودة حالياً
        $students = Student::where('section_id', $sectionId)
            ->with(['grades'])
            ->get(['id', 'student_name']);

        // 3. دمج البيانات: التأكد من أن كل طالب يملك قائمة المواد كاملة (حتى لو فارغة null)
        $formattedStudents = $students->map(function ($student) use ($subjectPlans) {
            $studentGrades = $student->grades->keyBy('class_subject_plan_id');

            $allGrades = $subjectPlans->map(function ($plan) use ($studentGrades) {
                // إذا كانت هناك علامة مخزنة للطالب نأخذها، وإلا نرجع قيم فارغة مع اسم المادة
                $existingGrade = $studentGrades->get($plan->id);

                return [
                    'class_subject_plan_id' => $plan->id,
                    'subject_name'          => $plan->subject->subject_name,
                    'sai_score'             => $existingGrade ? $existingGrade->sai_score : null,
                    'exam_term_1'           => $existingGrade ? $existingGrade->exam_term_1 : null,
                    'exam_term_2'           => $existingGrade ? $existingGrade->exam_term_2 : null,
                ];
            });

            return [
                'id'           => $student->id,
                'student_name' => $student->student_name,
                'grades'       => $allGrades
            ];
        });

        return response()->json([
            'success'  => true,
            'subjects' => $subjectPlans->map(fn($p) => ['id' => $p->id, 'name' => $p->subject->subject_name]), // مفيد جداً للـ Columns في React
            'data'     => $formattedStudents
        ]);
    }
}
