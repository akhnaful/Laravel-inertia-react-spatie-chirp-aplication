<?php

namespace Database\Factories;

use App\Models\Chirp;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChirpFactory extends Factory
{
    protected $model = Chirp::class;

    public function definition()
    {
        return [
            'message' => $this->faker->sentence(),
            'user_id' => User::inRandomOrder()->first()->id, // Ambil user random
            // atau: 'user_id' => User::pluck('id')->random(),
            
            // Tambahkan kolom lain jika ada
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
