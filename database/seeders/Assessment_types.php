<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Assessment_types extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('assessment_types')->insert([

            [
                'name' => 'السعي الأول',
                'type' => 'sai',
                'order_no' => 1
            ],

            [
                'name' => 'السعي الثاني',
                'type' => 'sai',
                'order_no' => 2
            ],

            [
                'name' => 'السعي الثالث',
                'type' => 'sai',
                'order_no' => 3
            ],

            [
                'name' => 'السعي الرابع',
                'type' => 'sai',
                'order_no' => 4
            ],

            [
                'name' => 'الفصلي الأول',
                'type' => 'exam',
                'order_no' => 5
            ],

            [
                'name' => 'الفصلي الثاني',
                'type' => 'exam',
                'order_no' => 6
            ]

        ]);
    }
}
