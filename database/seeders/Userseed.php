<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class Userseed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. إنشاء المستخدمين أولاً
        $users = [
            [
                'name' => 'Test User',
                'email' => 'taylor@kenzie.com',
                'email_verified_at' => '2026-06-27 15:48:18',
                'password' => Hash::make('123456'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'زهرة شعشوع',
                'email' => 'zh@test.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'زينب شعشوع',
                'email' => 'zainab@test.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // إدراج المستخدمين وجمع المعرفات
        $userIds = [];
        foreach ($users as $userData) {
            $userIds[] = DB::table('users')->insertGetId($userData);
        }

        // 2. تعيين الأدوار للمستخدمين
        $adminRole = Role::where('name', 'admin')->where('guard_name', 'web')->first();
        $supervisorRole = Role::where('name', 'supervisor')->where('guard_name', 'web')->first();

        if (!$adminRole || !$supervisorRole) {
            throw new \Exception('Roles not found. Please run PermissionsSeeder first.');
        }

        // تعيين دور admin للمستخدم الأول
        DB::table('model_has_roles')->insert([
            'role_id' => $adminRole->id,
            'model_type' => 'App\Models\User',
            'model_id' => $userIds[0], // Test User
        ]);

        // تعيين دور supervisor للمستخدمين الثاني والثالث
        foreach ([$userIds[1], $userIds[2]] as $userId) {
            DB::table('model_has_roles')->insert([
                'role_id' => $supervisorRole->id,
                'model_type' => 'App\Models\User',
                'model_id' => $userId,
            ]);
        }

        // تخزين المعرفات في متغيرات للاستخدام لاحقاً
        $adminId = $userIds[0];
        $zahraId = $userIds[1];
        $zainabId = $userIds[2];
    }
}
