<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class customermangemant extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('customermangemant')->insert([
            [
                'name' => 'John Doe',
                'email' => 'john@examplesss.com',
                'phone_number' => '1235567890',
                'special_requests'=> 'none'  
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane23@examplessss.com',
                'phone' => '9876543212',
                'special_requests'=> 'none'
            ],
        ]);
    }
}
