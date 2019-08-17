<?php

use Illuminate\Http\Request;
use Laravel\Passport\Passport;

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



Route::group(['prefix' => 'v1', 'middleware' => ['auth:api']], function () {


    Route::resource('leadform', 'LeadFormController');
    Route::resource('leadform.formitem', 'LeadFormItemController');
    Route::get('formitemtypes', 'LeadFormController@formItemTypes');
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
