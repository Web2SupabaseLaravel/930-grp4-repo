<?php

namespace App\Http\Controllers;

use App\Models\Tables;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class TablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Restaurant $restaurant) {
        $tables = $restaurant->tables;
        return view('tables.index', compact('restaurant', 'tables'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Restaurant $restaurant) {
        return view('tables.create', compact('restaurant'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Restaurant $restaurant)
    {
        $request->validate([
            'size' => 'required|integer',
            'status' => 'required|boolean',
            'location' => 'nullable|string',
        ]);

        $validated = ([
            'restaurant_id' => $restaurant->id,
            'size' => $request->size,
            'status' => $request->status,
            'location' => $request->location,
        ]);
        $restaurant->tables()->create($validated);

        return redirect()->route('tables.index', $restaurant)->with('success', 'Table created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tables $tables)
    {
        // $table = Tables::findOrFail($id);
        // return view('tables.show', compact('table'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant, Tables $table)
    {
        return view('tables.edit', compact('restaurant', 'table'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant, Tables $table)
    {
        
        $validated = $request->validate([
            'size' => 'required|integer',
            'status' => 'required|boolean',
            'location' => 'nullable|string',
        ]);

        $table->update($validated);

        return redirect()->route('tables.index', $restaurant)->with('success', 'Table updated.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant, Tables $table) {
        $table->delete();
        return redirect()->route('tables.index', $restaurant)->with('success', 'Table deleted successfully.');
    }
}
