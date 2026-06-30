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
        // إنشاء صلاحيات
        $addGrades = Permission::create(['name' => 'add grades']);
        $editGrades = Permission::create(['name' => 'edit grades']);
        $viewGrades = Permission::create(['name' => 'view grades']);

        // إنشاء أدوار
        $adminRole = Role::create(['name' => 'admin']);
        $supervisorRole = Role::create(['name' => 'supervisor']);

        // ربط الصلاحيات بالأدوار
        $supervisorRole->givePermissionTo($viewGrades);
        $adminRole->givePermissionTo([$editGrades, $viewGrades]); // المدير يأخذ كل شيء
        $user = User::find(1);
        $user->assignRole('admin');
    }
}
