<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        DB::table('model_has_roles')->insert([
            'role_id' => 1, // رقم 3 يمثل 'admin' في جدول roles الخاص بك
            'model_type' => 'App\Models\User', // أو حسب المسار المستخدم في مشروعك
            'model_id' =>3,
        ]);
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'password' => bcrypt('123'),
        // ]);
        // $this->call([
        //     RolesAndPermissionsSeeder::class,
        // ]);
    }
}
