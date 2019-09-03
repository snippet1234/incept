<?php

use App\FormItemType;
use App\LeadFormItemOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('register', 'AuthController@register');

Route::group(['prefix' => 'v1', 'middleware' => ['auth:api']], function () {
    Route::get('user', 'AuthController@user');
    Route::get('plans', 'PlanController@index');
    Route::post('create-order', 'RazorPayController@createOrder');


    Route::post('profile', function () {
        return Auth::user();
    });

    Route::resource('leadform', 'LeadFormController');
    Route::resource('leadform.formitem', 'LeadFormItemController');
    Route::get('formitemtypes', 'LeadFormController@formItemTypes');
    Route::get('seed-form', 'RazorPayController@seedForm');

});

Route::get('/template', function (Request $request) {
    
    $user = \App\User::first();
    $jsonString = Storage::disk('local')->get('form.json');
    $formItems = json_decode($jsonString, true);
    // return $formItems;
    $newForm = $user->forms()->create([]);
    foreach($formItems as $item) {
        $formItem = new \App\LeadFormItem([
            'name' => $item['name'],
            'label' => $item['label'],
            'placeholder' => $item['placeholder']
        ]);
        $type = FormItemType::find($item['type']['id']); 
        $formItem->type()->associate($type->id);
        $newForm->items()->save($formItem);        
        foreach($item['options'] as $option) {
            
            $option = new LeadFormItemOption([
                'value' => $option['value'],
            ]);
            $formItem->options()->save($option);
        }

    }
    return $newForm->with(['items', 'items.options', 'items.type'])->get();
});


Route::get('/clients', function (Request $request) {
    $client = DB::table("oauth_clients")->wherePasswordClient(1)->first();
    $data['client_id'] = $client->id;
    $data['secret'] = $client->secret;
    $data['base_url'] = URL::to('/');
    //it was 4
    $data['version'] = 1;
    return response($data);
});
