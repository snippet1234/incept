<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'razorpay_order_id',
        'amount',
        'currency',
        'type',
        'provider',
        'plan_id',
        'renewal_term',
        'form_count'
    ];
}
