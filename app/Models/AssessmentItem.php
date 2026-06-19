<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssessmentItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id',
        'name',
        'max_mark',
        'sort_order'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function marks()
    {
        return $this->hasMany(Mark::class);
    }
}