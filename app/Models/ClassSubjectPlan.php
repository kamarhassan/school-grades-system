<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassSubjectPlan extends Model
{


    protected $fillable = [
        'class_id',
        'subject_id',
        'max_first_term',
        'max_second_term',
        'max_final',
        'is_first_term_active',
        'is_second_term_active',
        'is_final_active'
    ];

    protected $casts = [
        'is_first_term_active' => 'boolean',
        'is_second_term_active' => 'boolean',
        'is_final_active' => 'boolean',
    ];

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }
    public function grades()
    {
        return $this->hasMany(Grade::class, 'plan_id');
    }
public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id');
    }

}
