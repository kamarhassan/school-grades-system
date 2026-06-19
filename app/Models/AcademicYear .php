<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class AcademicYear  extends Model
{
  use HasFactory;

    protected $fillable = ['name', 'is_active'];

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function assessmentPeriods()
    {
        return $this->hasMany(AssessmentPeriod::class);
    }
}
