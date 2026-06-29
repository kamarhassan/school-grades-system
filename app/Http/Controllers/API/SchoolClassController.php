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
       $classes = SchoolClass::select('id', 'class_name')->get();

        return response()->json([
            'success' => true,
            'data' => $classes
        ], 200);
    }
}
