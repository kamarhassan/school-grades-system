<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use League\CommonMark\Extension\Highlight\Mark;

class MarkController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required',
            'assessment_item_id' => 'required',
            'assessment_period_id' => 'required',
            'mark' => 'nullable|numeric'
        ]);

        return Mark::updateOrCreate(
            [
                'student_id' => $request->student_id,
                'assessment_item_id' => $request->assessment_item_id,
                'assessment_period_id' => $request->assessment_period_id,
            ],
            [
                'mark' => $request->mark
            ]
        );
    }
}