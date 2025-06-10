<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'id' => (string) Str::uuid(),
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = auth('api')->login($user);

        return response()->json([
            'message' => 'تم التسجيل بنجاح',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request){
        
    $validated = $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'بيانات تسجيل الدخول غير صحيحة'], 401);
    }

    $token = auth('api')->login($user);

    return response()->json([
        'message' => 'تم تسجيل الدخول بنجاح',
        'token' => $token,
    ]);
 }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح']);
    }
}