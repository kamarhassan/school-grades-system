<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
     return response()->json([
            'user' => 'as',
            'token' => 'AS'
        ]);
});
 Route::post('test', [AuthController::class, 'test']);