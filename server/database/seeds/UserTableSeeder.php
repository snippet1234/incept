<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::create([
            'name' => 'Akash Rajput',
            'email' => 'user@mail.com',
            'phone' => '8390516768',
            'password' => Hash::make('secret')
        ]);
    }
}
