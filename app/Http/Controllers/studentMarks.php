<?php

namespace App\Http\Controllers;

use App\Models\Student;


class studentMarks extends Controller
{
    public function studentMarks(Student $student)
{
    return $student->marks()
        ->with(['assessmentItem', 'assessmentPeriod'])
        ->get();
}
}
