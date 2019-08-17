<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeadFormItem extends Model
{
    protected $fillable = [
        'name',
        'label',
        'lead_form_id',
        'placeholder',
        'form_item_type_id'
    ];

    public function form()
    {
        return $this->belongsTo('App\LeadFormItem', 'lead_form_id');
    }

    public function type()
    {
        return $this->belongsTo('App\FormItemType', 'form_item_type_id');
    }
    public function options()
    {
        return $this->hasMany('App\LeadFormItemOption');
    }
}
