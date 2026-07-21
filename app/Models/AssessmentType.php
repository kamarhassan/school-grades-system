<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssessmentType extends Model
{
   protected $table = 'assessment_types';

    protected $fillable = [
        'name',
        'type',
        'order_no'
    ];

public function subjectAssessmentSettings()
{
    return $this->hasMany(
        SubjectAssessmentSetting::class
    );
}
}
