<?php

use Illuminate\Database\Seeder;

class FormsItemTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = ['select', 'text', 'number', 'textarea', 'date'];
        foreach ($types as $type) {
            \App\FormItemType::create([
                'name' => $type
            ]);
        }
    }
}
