<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ClassAssessmentType;
use Illuminate\Http\Request;

class AssessmentController extends Controller
{
    public function assessmentstatus(Request $request)
    {


       
        // 1. التحقق من صحة البيانات المدخلة
        $validated = $request->validate([
            'class_id'           => 'required|exists:school_classes,id',
            'assessment_type_id' => 'required|exists:assessment_types,id',
            'is_active'          => 'required|boolean',
        ]);

        // 2. تحديث الحالة أو إنشاؤها إن لم تكن موجودة مسبقاً
        $classAssessment = ClassAssessmentType::updateOrCreate(
            [
                'class_id'           => $validated['class_id'],
                'assessment_type_id' => $validated['assessment_type_id'],
                 'academic_year_id'   => currentAcademicYearId(), // افترض أن لديك دالة للحصول على السنة الدراسية الحالية
            ],
            [
                'is_active'          => $validated['is_active'],
            ]
        );

        // 3. إرجاع الاستجابة بنجاح
        return response()->json([
            'message' => 'تم تحديث حالة التقييم بنجاح',
            'data'    => $classAssessment
        ], 200);
    }
}
