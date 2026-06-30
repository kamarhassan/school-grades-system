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
        $editGrades = Permission::create(['name' => 'edit grades']);
        $viewSections = Permission::create(['name' => 'view sections']);

        // إنشاء أدوار
        $adminRole = Role::create(['name' => 'admin']);
        $supervisorRole = Role::create(['name' => 'supervisor']);

        // ربط الصلاحيات بالأدوار
        $supervisorRole->givePermissionTo($viewSections);
        $adminRole->givePermissionTo([$editGrades, $viewSections]); // المدير يأخذ كل شيء
        $user = User::find(3);
    }
}
