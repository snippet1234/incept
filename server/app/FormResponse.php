<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormResponse extends Model
{
    protected $fillable = [
        'value',
    ];

    public function user()
    {
        $this->belongsTo('App\User');
    }

    public function formItem()
    {
        $this->belongsTo('App\LeadFormItem');
    }
}
