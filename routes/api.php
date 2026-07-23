<?php

use App\Http\Controllers\API\AssessmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\API\GradeController;
use App\Http\Controllers\Api\SchoolClassController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\API\StudentsController;
use App\Http\Controllers\Api\SubjectAssessmentSettingController;
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


    Route::get('getstudents/{exams}/{class_id}/{section_id}', [StudentsController::class, 'getStudentsByClassAndSection']);

    Route::get('sections', [SectionController::class, 'index']);

    Route::post('grades/grid', [GradeController::class, 'getGradeGrid']);

    Route::get('class-sections', [SectionController::class, 'getSectionsByClass']); // get section if class_id is provided in the request   
    Route::middleware('permission:edit grades')->post('/grades/save', [GradeController::class, 'saveGrades']);




    route::prefix('settings')->group(function () {
        Route::get('sections', [SettingsController::class, 'index']);      // عرض الكل
        Route::post('sectionsStoreSetting', [SettingsController::class, 'store']);     // إضافة شعبة لصف
        Route::post('SetCurrentSchoolYear/{id}', [SettingsController::class, 'SetCurrentSchoolYear']);      // عرض الكل
        Route::get('CurrentSchoolYear', [SettingsController::class, 'currentschoolyear']);      // عرض الكل
        Route::post('AddSchoolYear', [SettingsController::class, 'AddSchoolYear']);      // عرض الكل
        Route::get('sectiontoclass', [SettingsController::class, 'sectiontoclass']);      // عرض الكل
        Route::post('saveClassesSections', [SettingsController::class, 'saveClassesSections']);      // عرض الكل
        
        Route::get('exam-settings/{class}',[SubjectAssessmentSettingController::class, 'index']); // عرض الكل
        Route::post('exam-settings/save',[SubjectAssessmentSettingController::class, 'store']);
            
        Route::post('assessmentstatus', [AssessmentController::class, 'assessmentstatus']);      // عرض الكل

    });
});
