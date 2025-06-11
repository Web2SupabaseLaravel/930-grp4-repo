<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;



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
            'description' => 'nullable|string',
            'manager_id' => 'required|exists:users,id',
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

  
    // upload images
 public function uploadImages(Request $request, $id)
{
    try {
        if (!$request->hasFile('images')) {
            return response()->json(['error' => 'No images uploaded'], 400);
        }

        $imageUrls = [];

        foreach ($request->file('images') as $image) {
            $path = $image->store('public/restaurant-images');
            $url = Storage::url($path);
            $imageUrls[] = $url;
        }

        // Optional: Save the URLs to the restaurant
        $restaurant = Restaurant::findOrFail($id);
        $existing = $restaurant->images ?? [];
        $restaurant->images = array_merge($existing, $imageUrls);
        $restaurant->save();

        return response()->json(['urls' => $imageUrls], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Unexpected error: ' . $e->getMessage()], 500);
    }
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
