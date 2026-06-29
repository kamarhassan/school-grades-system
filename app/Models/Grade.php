<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $fillable = ['student_id', 'plan_id', 'first_term_score', 'second_term_score', 'final_score'];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function subjectPlan()
    {
        return $this->belongsTo(ClassSubjectPlan::class, 'plan_id');
    }
}
