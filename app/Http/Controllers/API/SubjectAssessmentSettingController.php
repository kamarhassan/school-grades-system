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
        // 1. جلب جميع أنواع التقييمات مع علاقة الصف المحدد لمعرفة حالته
        $assessmentTypes = AssessmentType::with(['classAssessments' => function ($query) use ($classId) {
            $query->where('class_id', $classId);
        }])
            ->orderBy('order_no')
            ->get();

        // 2. جلب مواد الصف مع علاقاتها
        $subjects = ClassSubject::with(['subject', 'assessmentSettings'])
            ->where('class_id', $classId)
            ->get();

        // 3. بناء هيكل البيانات
        $data = $assessmentTypes->map(function ($assessmentType) use ($subjects) {

            // جلب سجل التفعيل الخاص بهذا الصف من العلاقة المجلوبة
            $classAssessment = $assessmentType->classAssessments->first();

            // تحديد حالة التفعيل: إذا كان هناك سجل نأخذ قيمته، وإلا نعتبره مفعلاً بشكل افتراضي (true)
            $isActive = $classAssessment ? (bool) $classAssessment->is_active : true;

            return [
                'assessment_type_id' => $assessmentType->id,
                'assessment_name'    => $assessmentType->name,
                'is_active'          => $isActive, // <--- تم إضافة حالة التفعيل هنا
                'subjects'           => $subjects->map(function ($item) use ($assessmentType) {

                    $setting = $item->assessmentSettings
                        ->firstWhere('assessment_type_id', $assessmentType->id);

                    return [
                        'class_subject_id' => $item->id,
                        'subject'          => $item->subject?->subject_name,
                        'is_split'         => (bool) ($setting?->is_split ?? false),
                    ];
                })->values()
            ];
        });

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * إنشاء إعداد جديد
     */
    public function store(Request $request)
    {

        // return response()->json([
        //             'message' => 'Assessment setting created',
        //             // 'date' => date(),
        //             'data' => $request->all()
        //         ], 201);


        $data = $request->validate([


            // 'class_id' => [
            //     'required',
            //     'exists:school_classes,id'
            // ],

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

        // return response()->json([
        //             'message' => 'Assessment setting hkhkjhkhkhk',
        //             // 'date' => date(),
        //             'data' => $data
        //         ], 201);    

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
