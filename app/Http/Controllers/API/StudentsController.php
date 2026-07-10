<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use App\Models\ClassSubjectPlan;
use App\Models\Student;


class StudentsController extends Controller
{


    public function getStudentsByClassAndSection($examId, $classId, $sectionId)
    {
        // السنة الدراسية الحالية
        $currentAcademicYearId = currentAcademicYearId();


        // المواد الخاصة بالصف
        $subjectPlans = ClassSubjectPlan::where('class_id', $classId)
            ->where('academic_year_id', $currentAcademicYearId)
            ->with('subject:id,subject_name')
            ->get();


        // الطلاب مع العلامات
        $students = Student::where('section_id', $sectionId)
            ->with('grades')
            ->get([
                'id',
                'student_name'
            ]);


        $formattedStudents = $students->map(function ($student) use ($subjectPlans, $examId) {

            $studentGrades = $student->grades
                ->keyBy('class_subject_plan_id');


            $row = [
                'id' => $student->id,
                'student_name' => $student->student_name,
            ];


            foreach ($subjectPlans as $plan) {

                $existingGrade = $studentGrades->get($plan->id);

                $score = null;


                if ($existingGrade) {

                    switch ($examId) {

                        // السعي الأول
                        case 1:
                            $score = $existingGrade->sai_score;
                            break;

                        // السعي الثاني
                        case 2:
                            $score = $existingGrade->sai_score;
                            break;

                        // امتحان الفصل الأول
                        case 3:
                            $score = $existingGrade->exam_term_1;
                            break;

                        // امتحان الفصل الثاني
                        case 4:
                            $score = $existingGrade->exam_term_2;
                            break;
                    }
                }


                // إنشاء عمود لكل مادة
                $row["subject_" . $plan->id] = $score;
            }


            return $row;
        });


        return response()->json([

            'success' => true,

            'subjects' => $subjectPlans->map(function ($plan) {

                return [
                    'id' => $plan->id,
                    'name' => $plan->subject->subject_name
                ];
            }),

            'data' => $formattedStudents

        ]);
    }
}
