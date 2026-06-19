<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Grade $grade)
    {
        return Student::whereHas('section', function ($q) use ($grade) {
            $q->where('grade_id', $grade->id);
        })->get();
    }
}