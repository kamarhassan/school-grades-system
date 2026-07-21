<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\ClassSubject;
use App\Models\SchoolClass;
use App\Models\Subject;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectPlanSeeder extends Seeder
{
    public function run(): void
    {
        $academicYear = AcademicYear::where('is_current', true)->first();

        if (!$academicYear) {
            return;
        }


        $classes = SchoolClass::all();

        $subjects = Subject::all();


        foreach ($classes as $class) {

            foreach ($subjects as $subject) {

                ClassSubject::firstOrCreate([
                    'class_id' => $class->id,
                    'subject_id' => $subject->id,
                    'academic_year_id' => $academicYear->id,
                ]);

            }

        }
    }
}