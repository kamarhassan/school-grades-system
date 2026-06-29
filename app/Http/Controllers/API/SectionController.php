<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetSectionsByClassRequest;
use App\Models\Section;
use GuzzleHttp\Psr7\Request;


class SectionController extends Controller
{
    public function index()
    {
        // استخدام Eager Loading لجلب العلاقات التي قمت بتعريفها في الموديل
        // $sections = Section::with(
        //     ['schoolClass', 'supervisor', 'students'])->get();
        $sections = Section::with([
            'schoolClass:id,class_name',
            // 'supervisor:id,name,email',
            // 'students:id,student_name,section_id'
        ])->get();
        return response()->json([
            'success' => true,
            'data' => $sections
        ], 200);
    }



    public function getSectionsByClass(GetSectionsByClassRequest $request) // <-- حقن كلاس التحقق هنا
    {
        // الكود لا يدخل إلى هنا إلا إذا نجح التحقق (Validation) تماماً
        
        $sections = Section::where('class_id', $request->class_id)
            ->with(['supervisor:id,name,email'])
            ->get(['id', 'section_name', 'class_id', 'supervisor_id']);

        return response()->json([
            'success' => true,
            'class_id' => $request->class_id,
            'data' => $sections
        ], 200);
    }
}
