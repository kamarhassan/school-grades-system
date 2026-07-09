<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
 protected $fillable = ['section_name', 'class_id', 'supervisor_id', 'academic_year_id'];

    // الشعبة تنتمي لصف معين
    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    // الشعبة يملكها ناظر (مستخدم) معين
    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    // الشعبة تحتوي على العديد من الطلاب
    public function students()
    {
        return $this->hasMany(Student::class, 'section_id');
    }
}
