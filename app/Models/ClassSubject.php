<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassSubject extends Model
{

    protected $fillable = [
        'class_id',
        'subject_id',
        'academic_year_id'
    ];

    // public function subject()
    // {
    //     return $this->belongsTo(Subject::class, 'subject_id');
    // }


    public function subject()
    {
        return $this->belongsTo(
            Subject::class,
            'subject_id'
        );
    }
    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }


    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }
   
   

    public function assessmentSettings()
    {
        return $this->hasMany(SubjectAssessmentSetting::class);
    }
}
