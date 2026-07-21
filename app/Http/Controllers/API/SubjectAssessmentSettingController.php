<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AssessmentType;
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
    $data = [];

    // جلب أنواع التقييم
    $assessmentTypes = AssessmentType::orderBy('order_no')->get();


    // جلب مواد الصف مرة واحدة
    $subjects = ClassSubject::with([
        'subject',
        'assessmentSettings'
    ])
    ->where('class_id', $classId)
    ->get();


    foreach ($assessmentTypes as $assessmentType) {

        $data[] = [

            'assessment_type_id' => $assessmentType->id,

            'assessment_name' => $assessmentType->name,


            'subjects' => $subjects->map(function ($item) use ($assessmentType) {


                // جلب إعداد هذا التقييم لهذه المادة
                $setting = $item->assessmentSettings
                    ->where('assessment_type_id', $assessmentType->id)
                    ->first();


                return [

                    'class_subject_id' => $item->id,

                    'subject' => $item->subject?->subject_name,


                    'is_split' => $setting
                        ? (bool) $setting->is_split
                        : false
                ];

            })->values()

        ];
    }


    return response()->json([
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


        $setting = SubjectAssessmentSetting::create($data);


        return response()->json([
            'message' => 'Assessment setting created',
            'data' => $setting
        ], 201);
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
}
