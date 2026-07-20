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
            'message' => 'تم جلب جميع الشعب بنجاح',
            'data' => $sections
        ], 200);
    }



    public function getSectionsByClass(GetSectionsByClassRequest $request) // <-- حقن كلاس التحقق هنا
    {
        // الكود لا يدخل إلى هنا إلا إذا نجح التحقق (Validation) تماماً

        // auth()->user(); // جلب المستخدم الحالي (المسجل الدخول)

        // dd("eins");
        // 1. التحقق هل المستخدم الحالي هو Admin
        // $isAdmin = auth()->user()->hasRole('admin');
        // $userId = auth()->id(); // معرف المستخدم الحالي


        $authUser = auth()->user(); // جلب المستخدم الحالي
        $isAdmin= $authUser->hasRole('admin'); // التحقق إذا كان المستخدم الحالي هو Admin
        $userId = $authUser->id; // جلب معرف المستخدم الحالي


        $sections = Section::where('class_id', $request->class_id)
            // حالة الـ Admin: يجلب كل شُعب الصف (أو يمكنك تخصيص شرط له إذا أردت)
            // حالة الـ Supervisor (إذا لم يكن آدمن): يجلب فقط الشُعب المعين فيها كمشرف
            ->when(!$isAdmin, function ($query) use ($userId) {
                $query->where('supervisor_id', $userId);
            })
            // يمكنك إبقاء شرط select أو علاقة المشرف للآدمن لكي يرى من هو المشرف الحالي
            ->with(['supervisor:id,name,email'])
            ->get();

        return response()->json([
            'success' => true,
            'class_id' => $request->class_id,
            'data' => $sections
        ], 200);
    }
}
