<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\API\GradeController;
use App\Http\Controllers\Api\SchoolClassController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\SettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;








Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::middleware('auth:sanctum')->group(function () {
    Route::get('classes', [SchoolClassController::class, 'index']);

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);


    Route::get('sections', [SectionController::class, 'index']);

    Route::post('grades/grid', [GradeController::class, 'getGradeGrid']);

    Route::get('class-sections', [SectionController::class, 'getSectionsByClass']); // get section if class_id is provided in the request   
    Route::middleware('permission:edit grades')->post('/grades/save', [GradeController::class, 'saveGrades']);




    route::prefix('settings')->group(function () {
        Route::get('sections', [SettingsController::class, 'index']);      // عرض الكل
        Route::post('sectionsStoreSetting', [SettingsController::class, 'store']);     // إضافة شعبة لصف
        

    });
});
