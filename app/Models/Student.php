<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['student_name', 'section_id'];

    // الطالب ينتمي لشعبة
    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    // الطالب لديه علامات متعددة مرصودة
   
    public function grades()
{
    return $this->hasMany(Grade::class);
}
}
