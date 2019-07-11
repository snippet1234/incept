<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeadForm extends Model
{
    protected $fillable = ['user_id'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function items()
    {
        return $this->hasMany('App\LeadFormItem');
    }
}
