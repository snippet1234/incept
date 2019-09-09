<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required',
            'phone' => 'required'
        ]);

        $u = new \App\User($request->only(['email', 'name', 'phone']));

        $u->password = Hash::make($request->password);

        $u->save();

        $this->seedForm($u);
        return $u;
    }

    public function seedForm(\App\User $user) {
        $jsonString = Storage::disk('local')->get('form.json');
        $formItems = json_decode($jsonString, true);

        $newForm = $user->forms()->create([]);
        foreach($formItems as $item) {
            $formItem = new \App\LeadFormItem([
                'name' => $item['name'],
                'label' => $item['label'],
                'placeholder' => $item['placeholder']
            ]);
            $type = \App\FormItemType::find($item['type']['id']); 
            $formItem->type()->associate($type->id);
            $newForm->items()->save($formItem);        
            foreach($item['options'] as $option) {
                
                $option = new \App\LeadFormItemOption([
                    'value' => $option['value'],
                ]);
                $formItem->options()->save($option);
            }
    
        }
        return $newForm->with(['items', 'items.options', 'items.type'])->get();
    }

    public function user()
    {
        return auth()->user();
    }
}
