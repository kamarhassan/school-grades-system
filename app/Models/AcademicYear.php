<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    // السماح بملء الحقول تلقائياً
    protected $fillable = [
        'name',       // اسم السنة الدراسية مثل "2025-2026"
        'is_current', // إذا كانت هذه السنة الحالية
    ];

    // علاقة العام الدراسي مع الشعب (كل عام دراسي لديه العديد من الشعب)
    public function sections()
    {
        return $this->hasMany(Section::class, 'academic_year_id');
    }
}