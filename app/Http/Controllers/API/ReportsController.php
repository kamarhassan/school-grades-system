<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\AssessmentType;
use App\Models\ClassSubject;
use App\Models\Section;
use App\Models\Student;
use App\Models\SubjectComponent;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    // public function getGradeGridReports(Request $request)
    // {


    //     // return response()->json([

    //     //     $request->all(),  
    //     // ]);

    //     $data = $request->validate([
    //         'section_id' => ['required', 'integer', 'exists:sections,id'],
    //     ]);


    //     $user = $request->user();

    //     $section = Section::with('class')->findOrFail($data['section_id']);

    //     if (
    //         $user->hasRole('supervisor') &&
    //         (int) $section->supervisor_id !== (int) $user->id
    //     ) {
    //         return response()->json([
    //             'error' => 'غير مصرح لك بعرض بيانات هذه الشعبة.',
    //         ], 403);
    //     }

    //     // العام الدراسي الحالي
    //     $academicYearId = AcademicYear::where('is_current', 1)->value('id');

    //     if (!$academicYearId) {
    //         return response()->json([
    //             'error' => 'لا يوجد عام دراسي حالي محدد.',
    //         ], 422);
    //     }

    //     // جميع أنواع التقييمات المفعّلة لهذا الصف في العام الحالي
    //     $assessmentTypes = AssessmentType::query()
    //         ->join('class_assessment_types as cat', 'cat.assessment_type_id', '=', 'assessment_types.id')
    //         ->where('cat.class_id', $section->class_id)
    //         ->where('cat.academic_year_id', $academicYearId)
    //         ->where('cat.is_active', 1)
    //         ->orderBy('assessment_types.order_no')
    //         ->select('assessment_types.*')
    //         ->get();

    //     // جميع مواد الصف في العام الحالي
    //     $classSubjects = ClassSubject::with('subject')
    //         ->where('class_id', $section->class_id)
    //         ->where('academic_year_id', $academicYearId)
    //         ->get();

    //     // جميع مكونات المواد في التقييمات المختلفة
    //     $components = SubjectComponent::query()
    //         ->whereIn('class_subject_id', $classSubjects->pluck('id'))
    //         ->whereIn('assessment_type_id', $assessmentTypes->pluck('id'))
    //         ->get()
    //         ->groupBy(
    //             fn($component) =>
    //             $component->class_subject_id . '-' . $component->assessment_type_id
    //         );

    //     // تجهيز قالب الأعمدة لكل مادة ولكل تقييم
    //     $columns = [];

    //     foreach ($assessmentTypes as $assessment) {
    //         foreach ($classSubjects as $classSubject) {
    //             $subjectComponents = $components->get(
    //                 $classSubject->id . '-' . $assessment->id,
    //                 collect()
    //             );

    //             if ($subjectComponents->isNotEmpty()) {
    //                 foreach ($subjectComponents as $component) {
    //                     $columns[] = [
    //                         'assessment_type_id' => $assessment->id,
    //                         'assessment_name' => $assessment->name,
    //                         'assessment_type' => $assessment->type,

    //                         'class_subject_id' => $classSubject->id,
    //                         'subject_id' => $classSubject->subject_id,
    //                         'subject_name' => $classSubject->subject->subject_name,

    //                         'subject_component_id' => $component->id,
    //                         'component_name' => $component->component_name,

    //                         'max_score' => $component->max_component_score,
    //                     ];
    //                 }
    //             } else {
    //                 $columns[] = [
    //                     'assessment_type_id' => $assessment->id,
    //                     'assessment_name' => $assessment->name,
    //                     'assessment_type' => $assessment->type,

    //                     'class_subject_id' => $classSubject->id,
    //                     'subject_id' => $classSubject->subject_id,
    //                     'subject_name' => $classSubject->subject->subject_name,

    //                     'subject_component_id' => null,
    //                     'component_name' => null,

    //                     'max_score' => $classSubject->max_score,
    //                 ];
    //             }
    //         }
    //     }

    //     // جلب الطلاب وعلاماتهم لجميع التقييمات
    //     $students = Student::where('section_id', $section->id)
    //         ->with([
    //             'grades' => function ($query) use (
    //                 $assessmentTypes,
    //                 $classSubjects
    //             ) {
    //                 $query->whereIn(
    //                     'exam_id',
    //                     $assessmentTypes->pluck('id')
    //                 )->whereIn(
    //                     'class_subject_id',
    //                     $classSubjects->pluck('id')
    //                 );
    //             },
    //         ])
    //         ->get();

    //     $studentsData = $students->map(function ($student) use ($columns) {
    //         $savedGrades = $student->grades->keyBy(
    //             fn($grade) =>
    //             $grade->exam_id . '-' .
    //                 $grade->class_subject_id . '-' .
    //                 ($grade->subject_component_id ?? 0)
    //         );

    //         return [
    //             'student_id' => $student->id,
    //             'student_name' => $student->student_name,

    //             'grades' => collect($columns)->map(function ($column) use ($savedGrades) {
    //                 $key = $column['assessment_type_id'] . '-' .
    //                     $column['class_subject_id'] . '-' .
    //                     ($column['subject_component_id'] ?? 0);

    //                 $grade = $savedGrades->get($key);

    //                 return [
    //                     'assessment_type_id' => $column['assessment_type_id'],
    //                     'class_subject_id' => $column['class_subject_id'],
    //                     'subject_component_id' => $column['subject_component_id'],

    //                     // العلامة غير المدخلة تبقى null
    //                     'grade' => $grade && $grade->score !== null
    //                         ? (float) $grade->score
    //                         : null,
    //                 ];
    //             })->values(),
    //         ];
    //     });

    //     return response()->json([
    //         'message' => [
    //             'class_id' => $section->class_id,
    //             'section_id' => $section->id,
    //             'academic_year_id' => $academicYearId,
    //             'assessments' => $assessmentTypes->map(fn($assessment) => [
    //                 'id' => $assessment->id,
    //                 'name' => $assessment->name,
    //                 'type' => $assessment->type,
    //                 'order_no' => $assessment->order_no,
    //             ])->values(),
    //             'columns' => $columns,
    //             'students' => $studentsData,
    //         ],
    //     ]);
    // }
}
