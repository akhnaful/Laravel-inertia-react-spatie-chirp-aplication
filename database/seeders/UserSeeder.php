<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin=User::create([
            'name'=>'Admin',
            'email'=> 'Admin1@gmail.com',
            'password'=>bcrypt('123456789'),
        ]);
        $admin->assignRole('admin');
    }
}
