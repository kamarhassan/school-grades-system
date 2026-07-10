<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectPlanSeeder extends Seeder
{
    public function run(): void
    {
        // 1. جلب السنة الدراسية الحالية المفعلة
        $currentAcademicYearId = DB::table('academic_years')
            ->where('is_current', 1)
            ->value('id');

        if (!$currentAcademicYearId) {
            // إذا لم تكن هناك سنة مفعلة، نقوم بإنشائها لتجنب المشاكل
            $currentAcademicYearId = DB::table('academic_years')->insertGetId([
                'year_name' => '2026/2027',
                'is_current' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // 2. إدخال مواد دراسية أساسية في جدول subjects (باستخدام insertOrIgnore لمنع التكرار)
        $subjects = [
            ['id' => 1, 'subject_name' => 'اللغة العربية'],
            ['id' => 2, 'subject_name' => 'الرياضيات'],
            ['id' => 3, 'subject_name' => 'العلوم'],
            ['id' => 4, 'subject_name' => 'اللغة الإنجليزية'],
            ['id' => 5, 'subject_name' => 'التاريخ والجغرافيا'],
            ['id' => 6, 'subject_name' => 'التربية الإسلامية'],
        ];

        foreach ($subjects as $subject) {
            DB::table('subjects')->insertOrIgnore([
                'id' => $subject['id'],
                'subject_name' => $subject['subject_name'],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // جلب جميع الصفوف الموجودة في قاعدة البيانات
        $classes = DB::table('school_classes')->get();

        // 3. ربط كل مادة بكل صف داخل جدول خطط المواد class_subject_plans
        foreach ($classes as $class) {
            foreach ($subjects as $subject) {
                
                // التأكد من أن الخطة غير موجودة مسبقاً لهذا الصف والمادة في هذه السنة
                $exists = DB::table('class_subject_plans')
                    ->where('class_id', $class->id)
                    ->where('subject_id', $subject['id'])
                    ->where('academic_year_id', $currentAcademicYearId)
                    ->exists();

                if (!$exists) {
                    DB::table('class_subject_plans')->insert([
                        'class_id' => $class->id,
                        'subject_id' => $subject['id'],
                        'academic_year_id' => $currentAcademicYearId,
                        'max_sai_1' => 00.00, // علامات افتراضية بناءً على السكيما الخاصة بك
                        'max_sai_2' => 00.00,
                        'max_sai_3' => 00.00,
                        'max_sai_4' => 00.00,
                        'max_exam_term_1' => 50.00,
                        'max_exam_term_2' => 50.00,
                        'is_sai_1_active' => 1,
                        'is_sai_2_active' => 1,
                        'is_sai_3_active' => 1,
                        'is_sai_4_active' => 1,
                        'is_exam_term_1_active' => 1,
                        'is_exam_term_2_active' => 1,
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }
            }
        }
    }
}