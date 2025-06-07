<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::all();
        return view('restaurants.index', compact('restaurants'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('restaurants.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'cuisine' => 'required',
            'phonenumber' => 'required',
            'opening_hours' => 'nullable',
            'capacity' => 'nullable|integer',
            'description' => 'nullable|string',
            'manager_id' => 'required|exists:users,id',
        ]);
       
        Restaurant::create($validated);

        return redirect()->route('restaurants.index')->with('success', 'Restaurant created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        return view('restaurants.show', compact('restaurant'));
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        return view('restaurants.edit', compact('restaurant'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->update($request->all());
        return redirect()->route('restaurants.index')->with('success', 'Restaurant updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();
        return redirect()->route('restaurants.index')->with('success', 'Restaurant deleted successfully.');
    }
}
