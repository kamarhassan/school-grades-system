<?php

use App\Http\Controllers\API\GradeController;
use App\Http\Controllers\Api\SchoolClassController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;






Route::get('/y', function () {
    return response()->json([
        'user' => 'as',
        'token' => 'AS'
    ]);
});


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('classes', [SchoolClassController::class, 'index']);

Route::get('class-sections', [SectionController::class, 'getSectionsByClass']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('sections', [SectionController::class, 'index']);
    Route::post('grades/grid', [GradeController::class, 'getGradeGrid']);
    // جلب شبكة رصد العلامات (متاح للآدمن وللناظر المصرح له)

    // رصد وحفظ العلامات جماعياً (محمي بصلاحية معينة من حزمة Spatie)
    Route::middleware('permission:edit grades')->post('/grades/save', [GradeController::class, 'saveGrades']);
});
