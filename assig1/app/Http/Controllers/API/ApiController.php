<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiController extends Controller
{
    private function corsJson($data, $status = 200)
    {
        return response()->json($data, $status)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->corsJson([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'customer',
        ]);

        return $this->corsJson([
            'message' => 'User registered successfully',
            'data' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return $this->corsJson(['error' => 'Unauthorized'], 401);
        }

        return $this->corsJson([
            'message' => 'Login successful',
            'token' => $token,
        ]);
    }

    public function profile(Request $request)
    {
        try {
            $token = $request->bearerToken();
            return $this->corsJson([
                'token_received' => $token,
                'user' => auth()->user()
            ]);
        } catch (\Exception $e) {
            return $this->corsJson([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUsers(Request $request)
    {
        $limit = $request->input('limit', 15);
        $users = User::paginate($limit);

        return $this->corsJson([
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    public function getUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->corsJson([
                'message' => 'User not found',
            ], 404);
        }

        return $this->corsJson([
            'data' => $user,
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->corsJson([
                'message' => 'User not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->corsJson([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }

        if ($request->has('email')) {
            $user->email = $request->email;
        }

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return $this->corsJson([
            'message' => 'User updated successfully',
            'data' => $user,
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->corsJson([
                'message' => 'User not found',
            ], 404);
        }

        $user->delete();

        return $this->corsJson([
            'message' => 'User deleted successfully',
        ]);
    }
}
