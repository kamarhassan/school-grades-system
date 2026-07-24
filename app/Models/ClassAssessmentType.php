<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassAssessmentType extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_id',
        'assessment_type_id',
        'is_active',
        'academic_year_id',

    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // العلاقة مع الصف الدراسي
    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    // العلاقة مع نوع التقييم
    public function assessmentType()
    {
        return $this->belongsTo(AssessmentType::class, 'assessment_type_id');
    }
}
