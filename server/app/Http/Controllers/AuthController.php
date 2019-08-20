<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required',
            'phone' => 'required'
        ]);

        $u = new \App\User($request->only(['email', 'name', 'phone']));

        $u->password = Hash::make($request->password);

        $u->save();

        return $u;
    }
}
