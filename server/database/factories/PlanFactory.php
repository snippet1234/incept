<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Plan;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Plan::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'description' => $faker->name,
        'forms_count' => $faker->numberBetween(10, 100),
        'website' => time() / 2 == 0,
    ];
});
