<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $supervisorRole = Role::firstOrCreate(['name' => 'supervisor', 'guard_name' => 'web']);
        $teacherRole = Role::firstOrCreate(['name' => 'teacher', 'guard_name' => 'web']);
        $studentRole = Role::firstOrCreate(['name' => 'student', 'guard_name' => 'web']);

        // 2. تعريف الأذونات مع المجموعات
        $permissions = [
            // أذونات المدير (Admin)
            'admin' => [
                'edit marks',
                'add student',
                'edit grades',
                'view grades',
                'print grades',
                'settings',
                'classes',
                'sections',
                'subjects',
                'academic years',
                'view reports',
            ],
            // أذونات المشرف (Supervisor)
            'supervisor' => [
                'edit grades',
                'view grades',
                'print grades',
                'view students',
                'sections',
            ],
            // أذونات المعلم (Teacher)
            'teacher' => [
                'view grades',
                'add grades',
                'edit grades',
                'view students',
            ],
            // أذونات الطالب (Student)
            'student' => [
                'view grades',
                'view reports',
            ],
        ];

        // 3. إنشاء الأذونات وتعيينها للأدوار
        foreach ($permissions as $roleName => $permissionNames) {
            $role = Role::where('name', $roleName)->where('guard_name', 'web')->first();
            
            if ($role) {
                foreach ($permissionNames as $permissionName) {
                    // إنشاء الصلاحية إذا لم تكن موجودة
                    $permission = Permission::firstOrCreate([
                        'name' => $permissionName,
                        'guard_name' => 'web',
                    ]);
                    
                    // تعيين الصلاحية للدور
                    $role->givePermissionTo($permission);
                }
            }
        }

        // 4. عرض رسالة نجاح (اختياري)
        $this->command->info('Permissions and roles seeded successfully!');
    }
}