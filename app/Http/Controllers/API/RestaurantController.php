<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RestaurantController extends Controller
{
    
    public function index(): JsonResponse
    {
        $restaurants = Restaurant::all();
        return response()->json($restaurants, 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'cuisine' => 'required|string',
            'phonenumber' => 'required|string',
            'opening_hours' => 'nullable|string',
            'capacity' => 'nullable|integer',
        ]);

        $restaurant = Restaurant::create($validated);
        return response()->json([
            'message' => 'Restaurant created successfully',
            'data' => $restaurant
        ], 201);
    }


    public function show($id): JsonResponse
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }
        return response()->json($restaurant, 200);
    }

  
    public function update(Request $request, $id): JsonResponse
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $restaurant->update($request->all());

        return response()->json([
            'message' => 'Restaurant updated successfully',
            'data' => $restaurant
        ], 200);
    }

  
    public function destroy($id): JsonResponse
    {
        $restaurant = Restaurant::find($id);
        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant not found'], 404);
        }

        $restaurant->delete();

        return response()->json(['message' => 'Restaurant deleted successfully'], 200);
    }
}
