<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
<<<<<<< HEAD
    // protected $fillable = ['student_id', 'plan_id', 'first_term_score', 'second_term_score', 'final_score'];
    // app/Models/Grade.php
    protected $fillable = [
        'exam_id',
        'class_id',
        'section_id',
        'student_id',
        'class_subject_id',
=======
protected $fillable = [
        'student_id',
        'class_subject_id',
        'assessment_type_id',
>>>>>>> 5e4ebb1d52cf4c45ddee1d8804322c1715c945c0
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
