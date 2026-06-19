<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index(Grade $grade)
    {
        return $grade->subjects()->with('assessmentItems')->get();
    }
}