<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
protected $fillable = [
        'student_id',
        'class_subject_id',
        'assessment_type_id',
        'subject_component_id',
        'score',
    ];
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function subjectPlan()
    {
        return $this->belongsTo(ClassSubjectPlan::class, 'plan_id');
    }
}
