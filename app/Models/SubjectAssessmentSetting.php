<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectAssessmentSetting extends Model
{

    protected $table = 'subject_assessment_settings';

    protected $fillable = [
        'class_subject_id',
        'assessment_type_id',
        'is_split',
        'academic_year_id',
         
        'component_name',
        'max_component_score',
    ];
  public function assessmentType()
{
    return $this->belongsTo(AssessmentType::class);
}


public function classSubject()
{
    return $this->belongsTo(ClassSubject::class);
}
}
