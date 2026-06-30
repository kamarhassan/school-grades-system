<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $user = User::find(3);
        // $user->assignRole('admin');
        // User::factory(10)->create();

    
        $this->call([
            FakerDataSeed::class,
        ]);

        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);
    }
}
