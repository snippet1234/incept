<?php

use Illuminate\Database\Seeder;

class PlanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(1, 10) as $index) {
            $plan = factory(\App\Plan::class)->make();
            \App\Plan::create($plan->toArray());
        }
    }
}
