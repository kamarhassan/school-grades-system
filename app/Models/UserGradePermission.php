<?php

namespace App\Models;

 


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserGradePermission extends Model
{
    use HasFactory;

    protected $table = 'user_grade_permissions';

    protected $fillable = [
        'user_id',
        'grade_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }
}