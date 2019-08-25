<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'logo', 'address', 'nmls', 'dre',
        'company_phone', 'company_address', 'company_email', 'company_nlms',
        'company_dre', 'phone',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function forms()
    {
        return $this->hasMany('App\LeadForm');
    }

    public function responses()
    {
        return $this->hasMany('App\FormResponses');
    }

    public function payments()
    {
        return $this->hasMany('App\Payment');
    }

    public function subscriptions()
    {
        return $this->hasMany('App\Subscription');
    }
}
