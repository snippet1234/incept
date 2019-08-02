<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LeadFormItemOption extends Model
{
    protected $fillable = [
        'value'
    ];
    
    public function formItem() {
        return $this->belongsTo('App\LeadFormItem', 'lead_form_item_id');
    }
}
