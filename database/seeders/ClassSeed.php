<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. السنوات الأكاديمية (Academic Years)
        $academicYearData = [
            'year_name' => '2026/2027',
            'is_current' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        $academicYearId = DB::table('academic_years')->insertGetId($academicYearData);

        // 2. الصفوف الدراسية (Classes) من الأول إلى التاسع
        $classesMock = [
            ['id' => 1, 'class_name' => 'الصف الأول'],
            ['id' => 2, 'class_name' => 'الصف الثاني'],
            ['id' => 3, 'class_name' => 'الصف الثالث'],
            ['id' => 4, 'class_name' => 'الصف الرابع'],
            ['id' => 5, 'class_name' => 'الصف الخامس'],
            ['id' => 6, 'class_name' => 'الصف السادس'],
            ['id' => 7, 'class_name' => 'الصف السابع'],
            ['id' => 8, 'class_name' => 'الصف الثامن'],
            ['id' => 9, 'class_name' => 'الصف التاسع'],
        ];

        foreach ($classesMock as $class) {
            DB::table('school_classes')->insert([
                'id' => $class['id'],
                'class_name' => $class['class_name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 3. إنشاء الشعب لكل صف
        $sectionsData = [];

        foreach ($classesMock as $class) {
            $classId = $class['id'];
            
            // تحديد عدد الشعب حسب الصف
            if ($classId == 8) {
                // الصف الثامن: 4 شعب (أ، ب، ج، د)
                $sections = ['أ', 'ب', 'ج', 'د'];
            } else {
                // باقي الصفوف: 3 شعب (أ، ب، ج)
                $sections = ['أ', 'ب', 'ج'];
            }

            // إنشاء الشعب للصف الحالي
            foreach ($sections as $sectionLetter) {
                $sectionsData[] = [
                    'section_name' =>  $sectionLetter,
                    'class_id' => $classId,
                    'academic_year_id' => $academicYearId,
                    'supervisor_id' => null, // سيتم تعيينه لاحقاً
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // إدراج جميع الشعب دفعة واحدة
        DB::table('sections')->insert($sectionsData);

        // 4. المواد الدراسية (Subjects)
        $subjects = [
            ['subject_name' => 'الرياضيات'],
            ['subject_name' => 'العلوم'],
            ['subject_name' => 'اللغة العربية'],
            ['subject_name' => 'اللغة الإنجليزية'],
        ];

        $insertedSubjectIds = [];
        foreach ($subjects as $subject) {
            $insertedSubjectIds[] = DB::table('subjects')->insertGetId([
                'subject_name' => $subject['subject_name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 5. عرض رسالة نجاح (اختياري)
        $this->command->info('Academic years, classes, sections, and subjects seeded successfully!');
        $this->command->info('Total sections created: ' . count($sectionsData));
    }
}