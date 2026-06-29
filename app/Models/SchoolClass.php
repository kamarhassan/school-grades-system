<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    protected $fillable = ['class_name'];

    // الصف يحتوي على العديد من الشعب
    public function sections()
    {
        return $this->hasMany(Section::class, 'class_id');
    }

    // الصف له خطة مواد متعددة
    public function subjectPlans()
    {
        return $this->hasMany(ClassSubjectPlan::class, 'class_id');
    }
}
