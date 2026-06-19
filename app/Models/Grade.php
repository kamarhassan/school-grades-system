<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'academic_year_id',
        'name',
        'sort_order',
        'passing_average'
    ];

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_grade_permissions');
    }

}