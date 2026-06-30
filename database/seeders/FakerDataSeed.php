<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class FakerDataSeed extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. حسابات المستخدمين (Users) لتعيينهم كمشرفين
            $adminId = DB::table('users')->insertGetId([
                'name' => 'Test User',
                'email' => 'taylor@kenzie.com',
                'email_verified_at' => '2026-06-27 15:48:18',
                'password' => Hash::make('123456'), // كلمة المرور  المشفرة
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
         DB::table('model_has_roles')->insert([
            'role_id' => 1, // دور الـ supervisor بناءً على نظام Spatie الخاص بك
            'model_type' => 'App\Models\User',
            'model_id' => $adminId,
        ]);

 
        $zahraId = DB::table('users')->insertGetId([
            'id' => 2,
            'name' => 'زهرة شعشوع',
            'email' => 'zh@test.com',
            'email_verified_at' => now(),
            'password' => Hash::make('123456'), // كلمة المرور المطلوبة
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('model_has_roles')->insert([
            'role_id' => 2, // دور الـ supervisor بناءً على نظام Spatie الخاص بك
            'model_type' => 'App\Models\User',
            'model_id' => $zahraId,
        ]);
        // 2. السنوات الأكاديمية (Academic Years)
       // 2. السنوات الأكاديمية (Academic Years)
        $academicYearId = DB::table('academic_years')->insertGetId([
            'year_name' => '2026/2027',
            'is_current' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 3. الصفوف الدراسية (Classes) من الأول إلى التاسع
        $classesMock = [
            ['id' => 1, 'name' => 'الصف الأول'],
            ['id' => 2, 'name' => 'الصف الثاني'],
            ['id' => 3, 'name' => 'الصف الثالث'],
            ['id' => 4, 'name' => 'الصف الرابع'],
            ['id' => 5, 'name' => 'الصف الخامس'],
            ['id' => 6, 'name' => 'الصف السادس'],
            ['id' => 7, 'name' => 'الصف السابع'],
            ['id' => 8, 'name' => 'الصف الثامن'],
            ['id' => 9, 'name' => 'الصف التاسع'],
        ];

        foreach ($classesMock as $class) {
            DB::table('school_classes')->insert([
                'id' => $class['id'],
                'class_name' => $class['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 4. المواد الدراسية (Subjects)
        $subjects = ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية'];
        $insertedSubjectIds = [];
        foreach ($subjects as $subjectName) {
            $insertedSubjectIds[] = DB::table('subjects')->insertGetId([
                'subject_name' => $subjectName,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // أسماء الطلاب لتوزيعهم التجريبي
        $studentNames = [
            'محمد أحمد', 'علي حسن', 'فاطمة الزهراء', 'حسين إبراهيم', 'زينب العلي',
            'عمر فاروق', 'مريم محمود', 'يوسف عباس', 'خديجة رضوان', 'عباس جعفر'
        ];

        // 5. إنشاء الشعب والطلاب وتوزيع النظار بناءً على المرحلة
        foreach ($classesMock as $class) {
            $classId = $class['id'];
            $sectionsForThisClass = ['Section A', 'Section B', 'Section C'];

            // تحديد المشرف المسؤول بناءً على الصف: زهرة شعشوع مسؤولة عن 7 و 8 و 9، الباقي للـ Admin التجريبي
            $currentSupervisor = in_array($classId, [7, 8, 9]) ? $zahraId : $adminId;

            foreach ($sectionsForThisClass as $sectionName) {
                $sectionId = DB::table('sections')->insertGetId([
                    'section_name' => $sectionName,
                    'class_id' => $classId,
                    'academic_year_id' => $academicYearId,
                    'supervisor_id' => $currentSupervisor, // إسناد زهرة للصفوف 7، 8، 9 تلقائياً
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                shuffle($studentNames);
                foreach (array_slice($studentNames, 0, 3) as $name) {
                    DB::table('students')->insert([
                        'student_name' => $name,
                        'section_id' => $sectionId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            // 6. إنشاء خطط المواد والدرجات للطلاب
            foreach ($insertedSubjectIds as $subjectId) {
                $planId = DB::table('class_subject_plans')->insertGetId([
                    'class_id' => $classId,
                    'subject_id' => $subjectId,
                    'academic_year_id' => $academicYearId,
                    'max_sai_1' => 40.00,
                    'max_sai_2' => 40.00,
                    'max_sai_3' => 40.00,
                    'max_sai_4' => 40.00,
                    'max_exam_term_1' => 50.00,
                    'max_exam_term_2' => 50.00,
                    'is_sai_1_active' => 1,
                    'is_sai_2_active' => 1,
                    'is_sai_3_active' => 1,
                    'is_sai_4_active' => 1,
                    'is_exam_term_1_active' => 1,
                    'is_exam_term_2_active' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $currentClassSections = DB::table('sections')->where('class_id', $classId)->pluck('id');
                $currentClassStudents = DB::table('students')->whereIn('section_id', $currentClassSections)->pluck('id');

                for ($sai = 1; $sai <= 4; $sai++) {
                    $componentId = DB::table('subject_components')->insertGetId([
                        'class_subject_plan_id' => $planId,
                        'component_name' => "تقييم السعي " . $sai,
                        'sai_number' => $sai,
                        'max_component_score' => 40.00,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    foreach ($currentClassStudents as $studentId) {
                        $examTerm1 = ($sai == 2) ? rand(30, 50) : null; 
                        $examTerm2 = ($sai == 4) ? rand(30, 50) : null; 

                        DB::table('grades')->insert([
                            'student_id' => $studentId,
                            'class_subject_plan_id' => $planId,
                            'sai_number' => $sai,
                            'subject_component_id' => $componentId,
                            'sai_score' => rand(25, 40),
                            'exam_term_1' => $examTerm1,
                            'exam_term_2' => $examTerm2,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }
        }
    }
}