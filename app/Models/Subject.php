<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = ['subject_name'];

    // المادة يمكن أن تدرج في خطط صفوف متعددة
    public function classPlans()
    {
        return $this->hasMany(ClassSubjectPlan::class, 'subject_id');
    }
    public function components()
{
    return $this->hasMany(
        SubjectComponent::class,
        'subject_id'
    );
}
}
