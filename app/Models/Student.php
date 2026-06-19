<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_id',
        'student_number',
        'full_name'
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function marks()
    {
        return $this->hasMany(Mark::class);
    }
}