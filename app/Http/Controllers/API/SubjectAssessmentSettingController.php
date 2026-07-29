<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AssessmentType;
use App\Models\ClassAssessmentType;
use App\Models\ClassSubject;
use App\Models\SubjectAssessmentSetting;
use Illuminate\Http\Request;

class SubjectAssessmentSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  public function index($classId)
{
    $currentYearId = currentAcademicYearId();

    $assessmentTypes = AssessmentType::with([
        'classAssessments' => function ($query) use ($classId, $currentYearId) {
            $query->where('class_id', $classId)
                  ->where('academic_year_id', $currentYearId);
        }
    ])
    ->orderBy('order_no')
    ->get();


    $subjects = ClassSubject::with([
        'subject',
        'assessmentSettings' => function ($query) use ($currentYearId) {
            $query->where('academic_year_id', $currentYearId);
        }
    ])
    ->where('class_id', $classId)
    ->get();


    $data = $assessmentTypes->map(function ($assessmentType) use ($subjects) {

        $classAssessment = $assessmentType->classAssessments->first();

        return [
            'assessment_type_id' => $assessmentType->id,

            'assessment_name' => $assessmentType->name,

            'is_active' => (bool) ($classAssessment?->is_active ?? false),

            'subjects' => $subjects->map(function ($classSubject) use ($assessmentType) {

                $setting = $classSubject->assessmentSettings
                    ->where('assessment_type_id', $assessmentType->id)
                    ->first();

                return [
                    'class_subject_id' => $classSubject->id,

                    'subject' => $classSubject->subject?->subject_name,

                    'is_split' => (bool) ($setting?->is_split ?? false),
                ];

            })->values()
        ];

    });


    return response()->json([
        'academic_year_id' => $currentYearId,
        'data' => $data
    ]);
}
    /**
     * إنشاء إعداد جديد
     */
    public function store(Request $request)
    {

       $data = $request->validate([
        'class_subject_id' => [
            'required',
            'exists:class_subjects,id'
        ],
        'assessment_type_id' => [
            'required',
            'exists:assessment_types,id'
        ],
        'is_split' => [
            'required',
            'boolean'
        ],
    ]);

    $data['academic_year_id'] = currentAcademicYearId();

    // updateOrCreate looks for existing records matching the first array.
    // If found, it updates them with the second array. If not, it creates a new record.
    $setting = SubjectAssessmentSetting::updateOrCreate(
        [
            'class_subject_id'   => $data['class_subject_id'],
            'assessment_type_id' => $data['assessment_type_id'],
            'academic_year_id'   => $data['academic_year_id'],
        ],
        [
            'is_split'           => $data['is_split'],
        ]
    );

    return response()->json([
        'message' => 'Assessment setting saved successfully',
        'data'    => $setting
    ], 200);
    }



    /**
     * تعديل إعداد
     */
    public function update(Request $request, SubjectAssessmentSetting $subjectAssessmentSetting)
    {

        $data = $request->validate([

            'is_split' => [
                'required',
                'boolean'
            ]

        ]);


        $subjectAssessmentSetting->update($data);


        return response()->json([
            'message' => 'Assessment setting updated',
            'data' => $subjectAssessmentSetting
        ]);
    }



    /**
     * حذف إعداد
     */
    public function destroy(SubjectAssessmentSetting $subjectAssessmentSetting)
    {

        $subjectAssessmentSetting->delete();


        return response()->json([
            'message' => 'Deleted successfully'
        ]);
    }




      public function getClassAssessments(Request $request)
    {
        $request->validate([
            'class_id' => 'required|exists:school_classes,id',
        ]);

        $academicYearId = currentAcademicYearId();

        $assessments = AssessmentType::leftJoin('class_assessment_types as cat', function ($join) use ($request, $academicYearId) {

            $join->on('assessment_types.id', '=', 'cat.assessment_type_id')
                ->where('cat.class_id', $request->class_id)
                ->where('cat.academic_year_id', $academicYearId);
        })
            ->select(
                'assessment_types.id',
                'assessment_types.name',
                'assessment_types.order_no'
            )
            ->selectRaw('COALESCE(cat.is_active,0) as is_active')
            ->orderBy('assessment_types.order_no')
            ->get();

        return response()->json([
            'academic_year_id' => $academicYearId,
            'class_id' => $request->class_id,
            'data' => $assessments
        ]);
    }
}
