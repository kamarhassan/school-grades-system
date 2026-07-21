<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubjectAssessmentSetting extends Model
{
  public function assessmentType()
{
    return $this->belongsTo(AssessmentType::class);
}


public function classSubject()
{
    return $this->belongsTo(ClassSubject::class);
}
}
