<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\SubjectComponent;

class SubjectComponentSeeder extends Seeder
{
    public function run(): void
    {
$arabic = Subject::where(
    'subject_name',
    'اللغة العربية'
)->first();
        if (!$arabic) {
            return;
        }


        $components = [
            'شفهي',
            'خطي',
            'فهم وقراءة'
        ];


        foreach ($components as $component) {

            SubjectComponent::updateOrCreate(

                [
                    'subject_id' => $arabic->id,
                    'assessment_type_id' => 1,
                    'component_name' => $component,
                ],

                [
                    'is_split' => true,
                    'max_component_score' => 10,
                ]

            );

        }

    }
}