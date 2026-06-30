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
        // جلب الصفوف مع الشعب التابعة لها، وطلاب كل شعبة بشكل متداخل (Nested Relation)
        $userId = auth()->id();

       $classes = SchoolClass::select('id', 'class_name')
            ->whereHas('sections', function ($query) use ($userId) {
                $query->where('supervisor_id', $userId);
            })
            ->get();

        return response()->json([
            'success' => true,
            'data' => $classes,
        ], 200);
    }
}
