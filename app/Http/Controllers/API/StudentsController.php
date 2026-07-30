<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\Controller;
use App\Models\ClassSubject;
use App\Models\ClassSubjectPlan;
use App\Models\Student;


class StudentsController extends Controller
{

    public function getStudentsByClassAndSection($classId, $sectionId, $examId)
    {
        // $classId = $request->class_id;
        // $sectionId = $request->section_id;
        // $examId = $request->exam_id ?? $request->assessment_type_id;

        $academicYearId = currentAcademicYearId();

        /*
    |--------------------------------------------------------------------------
    | المواد الخاصة بالصف مع التشعيبات
    |--------------------------------------------------------------------------
    */
        $subjects = ClassSubject::where('class_id', $classId)
            ->where('academic_year_id', $academicYearId)
            ->with([
                'subject.components' => function ($q) use ($examId) {
                    $q->where('assessment_type_id', $examId);
                },
                'assessmentSettings' => function ($q) use ($examId) {
                    $q->where('assessment_type_id', $examId);
                }
            ])
            ->get();

        /*
    |--------------------------------------------------------------------------
    | الطلاب
    |--------------------------------------------------------------------------
    */
        $students = Student::where('section_id', $sectionId)
            ->with([
                'grades' => function ($q) use ($examId) {
                    $q->where('assessment_type_id', $examId);
                }
            ])
            ->get();

        /*
    |--------------------------------------------------------------------------
    | تجهيز المواد للجدول
    |--------------------------------------------------------------------------
    */
        $tableSubjects = collect();

        foreach ($subjects as $subject) {

            $isSplit = $subject->assessmentSettings
                ->first()?->is_split ?? false;

            // مادة مشعبة
            if ($isSplit && $subject->subject && $subject->subject->components->count()) {

                foreach ($subject->subject->components as $component) {

                    $tableSubjects->push([
                        'id' => $subject->id . '_' . $component->id,
                        'class_subject_id' => $subject->id,
                        'subject_component_id' => $component->id,
                        'name' =>
                        $subject->subject->subject_name
                            . ' - '
                            . $component->component_name,
                        'is_component' => true,
                        // 👈 إضافة الحد الأقصى للفرع
                        'max_score' => (float) $component->max_component_score
                    ]);
                }
            } else {

                // مادة عادية
                $tableSubjects->push([
                    'id' => $subject->id,
                    'class_subject_id' => $subject->id,
                    'subject_component_id' => null,
                    'name' => $subject->subject ? $subject->subject->subject_name : '',
                    'is_component' => false,
                    // 👈 إضافة الحد الأقصى للمادة الكلية
                    'max_score' => (float) ($subject->max_score ?? 100.00)
                ]);
            }
        }

        /*
    |--------------------------------------------------------------------------
    | تجهيز الطلاب
    |--------------------------------------------------------------------------
    */
        $data = $students->map(function ($student) use ($tableSubjects) {

            $row = [
                'id' => $student->id,
                'student_name' => $student->student_name,
            ];

            foreach ($tableSubjects as $subject) {

                $gradeQuery = $student->grades
                    ->where(
                        'class_subject_id',
                        $subject['class_subject_id']
                    );

                // إذا كان لها تشعيب
                if ($subject['subject_component_id']) {

                    $grade = $gradeQuery
                        ->where(
                            'subject_component_id',
                            $subject['subject_component_id']
                        )
                        ->first();
                } else {

                    // مادة عادية
                    $grade = $gradeQuery
                        ->whereNull('subject_component_id')
                        ->first();
                }

                $row['subject_' . $subject['id']] = $grade ? (float) $grade->score : null;
            }

            return $row;
        });

        return response()->json([
            'success' => true,
            'data' => [
                'subjects' => $tableSubjects,
                'students' => $data
            ]
        ]);
    }
}
