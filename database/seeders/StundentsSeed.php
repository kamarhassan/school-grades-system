<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StundentsSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $sections = Section::all();

        foreach ($sections as $section) {
            $studentsData = [];

            // توليد 25 طالباً لهذه الشعبة
            for ($i = 1; $i <= 25; $i++) {
                // تركيب اسم عشوائي (اسم أول + اسم أخير)
               
                
                $studentsData[] = [
                    'student_name' =>fake()->name(),
                    'section_id'   => $section->id, // ربط الطالب بـ ID الشعبة الحالية
                    'created_at'   => now(),
                    'updated_at'   => now()
                ];
            }

            // إدخال الـ 25 طالباً دفعة واحدة في جدول الطلاب الخاص بهذه الشعبة
            DB::table('students')->insert($studentsData);
        }
    }
}
