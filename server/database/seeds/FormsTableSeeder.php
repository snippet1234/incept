<?php

use Illuminate\Database\Seeder;

class FormsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = \App\User::all();
        $faker = Faker\Factory::create();

        foreach ($users as $user) {
            $leadForm = $user->forms()->create([]);

            foreach (range(0, 10) as $index) {
                $leadForm->items()->create([]);
            }
        }
        \App\LeadForm::create([
            'name' => 'Akash Rajput',
            'email' => 'user@mail.com',
            'phone' => '8390516768',
            'password' => Hash::make('secret')
        ]);
    }
}
