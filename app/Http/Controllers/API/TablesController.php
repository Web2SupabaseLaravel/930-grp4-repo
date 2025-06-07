<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tables;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class TablesController extends Controller
{
    public function index(Restaurant $restaurant)
    {
        return response()->json($restaurant->tables, 200);
    }

    public function store(Request $request, Restaurant $restaurant)
    {
        $validated = $request->validate([
            'size' => 'required|integer',
            'status' => 'required|boolean',
            'location' => 'nullable|string',
        ]);

        $validated['restaurant_id'] = $restaurant->id;
        $table = $restaurant->tables()->create($validated);

        return response()->json([
            'message' => 'Table created successfully.',
            'data' => $table
        ], 201);
    }


    public function show(Restaurant $restaurant, Tables $table)
    {
        if ($table->restaurant_id !== $restaurant->id) {
            return response()->json(['message' => 'Table does not belong to this restaurant'], 403);
        }

        return response()->json($table, 200);
    }


    public function update(Request $request, Restaurant $restaurant, Tables $table)
    {
        if ($table->restaurant_id !== $restaurant->id) {
            return response()->json(['message' => 'Unauthorized table access'], 403);
        }

        $validated = $request->validate([
            'size' => 'required|integer',
            'status' => 'required|boolean',
            'location' => 'nullable|string',
        ]);

        $table->update($validated);

        return response()->json([
            'message' => 'Table updated successfully.',
            'data' => $table
        ], 200);
    }


    public function destroy(Restaurant $restaurant, Tables $table)
    {
        if ($table->restaurant_id !== $restaurant->id) {
            return response()->json(['message' => 'Unauthorized table access'], 403);
        }

        $table->delete();

        return response()->json(['message' => 'Table deleted successfully.'], 200);
    }
}
