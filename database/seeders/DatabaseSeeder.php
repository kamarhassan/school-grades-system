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
      
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        $this->call([
            Userseed::class,
        ]);
    
        $this->call([
            ClassSeed::class,
        ]);
        $this->call([
            StundentsSeed::class,
        ]);
        $this->call([
            SubjectPlanSeeder::class,
        ]);

    }
}
