<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeadFormItem extends Model
{
    protected $fillable = [
        'name',
        'label',
        'placeholder',
    ];

    public function form()
    {
        return $this->belongsTo('App\LeadFormItem');
    }

    public function type()
    {
        return $this->belongsTo('App\LeadFormItemType');
    }
}
