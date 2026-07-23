<?php

namespace App\Models;

use App\Models\ClassAssessmentType;
use App\Models\SubjectAssessmentSetting;
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
    // داخل نموذج AssessmentType.php
public function classAssessments()
{
    return $table = $this->hasMany(ClassAssessmentType::class, 'assessment_type_id');
}
}
