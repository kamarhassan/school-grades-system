<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'grade_id',
        'name',
        'sort_order'
    ];

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function assessmentItems()
    {
        return $this->hasMany(AssessmentItem::class);
    }
}