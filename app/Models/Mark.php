<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Mark extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'assessment_item_id',
        'assessment_period_id',
        'mark'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function assessmentItem()
    {
        return $this->belongsTo(AssessmentItem::class);
    }

    public function assessmentPeriod()
    {
        return $this->belongsTo(AssessmentPeriod::class);
    }
}