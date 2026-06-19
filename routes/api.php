<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;






Route::get('/y', function () {
     return response()->json([
            'user' => 'as',
            'token' => 'AS'
        ]);
});




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);



Route::get('/grades', [GradeController::class, 'index']);
Route::get('/grades/{grade}/students', [StudentController::class, 'index']);
Route::get('/grades/{grade}/subjects', [SubjectController::class, 'index']);
Route::post('/marks', [MarkController::class, 'store']);
Route::get('/students/{student}/marks', [MarkController::class, 'studentMarks']);
Route::get('/me/grades', [PermissionController::class, 'grades']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    // Route::get('/grades', [GradeController::class, 'index']);
    // Route::get('/grades/{grade}/students', [StudentController::class, 'index']);
    // Route::get('/grades/{grade}/subjects', [SubjectController::class, 'index']);
    // Route::post('/marks', [MarkController::class, 'store']);
    // Route::get('/students/{student}/marks', [MarkController::class, 'studentMarks']);
    // Route::get('/me/grades', [PermissionController::class, 'grades']);
});
