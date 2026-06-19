<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()
            ->grades()
            ->with('sections')
            ->get();
    }
}