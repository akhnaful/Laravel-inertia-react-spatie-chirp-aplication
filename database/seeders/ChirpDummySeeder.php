<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Chirp;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ChirpDummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Buat user dan chirps
        User::factory(50)->create()->each(function ($user) {
            $user->assignRole('user');
            
            // Buat 5-10 chirp untuk setiap user
            Chirp::factory(rand(5, 10))->create([
                'user_id' => $user->id
            ]);
        });
    
        // Atau buat chirp terpisah
        Chirp::factory(100)->create();
    }
}
