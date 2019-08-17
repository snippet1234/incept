<?php

use Illuminate\Database\Seeder;
use App\LeadFormItem;

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
        $formItemTypes = \App\FormItemType::pluck('id');
        $faker = Faker\Factory::create();

        foreach ($users as $user) {
            $leadForm = $user->forms()->create(['name' => 'Some Form']);

            foreach (range(0, 10) as $index) {
                $formItemName = $faker->word;
                LeadFormItem::create([
                    'lead_form_id' => $leadForm->id,
                    'form_item_type_id' => $faker->randomElement($formItemTypes),
                    'name' => $formItemName,
                    'label' => $formItemName,
                    'placeholder' => $formItemName,
                ]);
            }
        }
    }
}
