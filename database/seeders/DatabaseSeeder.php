<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory(2)->create();

        User::factory()->create([
            'firstname' => 'ali',
            'lastname' => 'alaoui',
            'email' => 'ali@gmail.com',
            'password' => 'aaaaaaaa',
        ]);

        Admin::factory()->create([
            'firstname' => 'admin',
            'lastname' => 'lastadmin',
            'date_of_birth' => fake()->date(),
            'email' => 'admin@gmail.com',
            'password' => Hash::make('aaaaaaaa'),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(),10),
        ]);

        Teacher::factory()->create([
            'firstname' => 'teacher',
            'lastname' => 'lastteacher',
            'date_of_birth' => fake()->date(),
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('aaaaaaaa'),            
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(),10),
        ]);
    }
}
