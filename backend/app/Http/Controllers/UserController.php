<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    function Signup(Request $request)
    {
        $request->validate([
            'name' => 'required|regex:/^[a-zA-Z\s]+$/|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);
        $user = new User;

        $user->name=$request->input('name');
        $user->email=$request->input('email');
        $user->password=Hash::make($request->input('password'));
        $user->save();
        return $user;
    }
    function Login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $credentials = $request->only('email','password');
        if (Auth::attempt($credentials)){
            return response([
                "name"=>Auth::user()->name,
                "isAdmin"=>Auth::user()->isAdmin,
                "id"=>Auth::user()->id

            ]);

        }
        return response([
            'error' =>'Invalid Credentials'
        ]);
    }
}
