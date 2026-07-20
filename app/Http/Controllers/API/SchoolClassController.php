<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolClass;

class SchoolClassController extends Controller
{
    /**
     * جلب جميع الصفوف مع الشعب والطلاب التابعين لها
     */
    public function index()
    {

        $authUser = auth()->user(); // جلب المستخدم الحالي
        $isAdmin = $authUser->hasRole('admin'); // التحقق إذا كان المستخدم الحالي هو Admin
        $userId = $authUser->id; // جلب معرف المستخدم الحالي

        $classes = SchoolClass::select('id', 'class_name')
            // إذا كان الأدمن سجل دخوله ($isAdmin تساوي true)، سيتم تخطي هذا الشرط وجلب الكل
            // إذا كان false (أي مشرف)، سيتم تطبيق الـ query المكتوبة بداخلها
            ->when(!$isAdmin, function ($query) use ($userId) {
                $query->whereHas('sections', function ($q) use ($userId) {
                    $q->where('supervisor_id', $userId);
                });
            })
            ->get();
        return response()->json([
            'success' => true,
            'data' => $classes,
        ], 200);
    }
}
