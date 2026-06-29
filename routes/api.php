<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\GradeController;

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

Route::middleware('auth:sanctum')->group(function () {

    // جلب شبكة رصد العلامات (متاح للآدمن وللناظر المصرح له)
    Route::post('/grades/grid', [GradeController::class, 'getGradeGrid']);

    // رصد وحفظ العلامات جماعياً (محمي بصلاحية معينة من حزمة Spatie)
    Route::middleware('permission:edit grades')->post('/grades/save', [GradeController::class, 'saveGrades']);
});
