<?php

namespace App\Http\Controllers\Api;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class ReservationApiController extends Controller
{
    public function index()
    {
        return response()->json(Reservation::all());
    }

    public function show($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        return response()->json($reservation);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'duration' => 'required|string',
            'party_size' => 'required|integer',
            'location' => 'required|string',
            'cuisine' => 'required|string',
            'time' => 'required|string',
        ]);

        $validated['id'] = (string) Str::uuid();
        $validated['restaurant_id'] = 'fbf8569e-3b52-433e-95ac-33a04b55f336';

        $reservation = Reservation::create($validated);

        return response()->json($reservation, 201);
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        $validated = $request->validate([
            'date' => 'required|date',
            'duration' => 'required|string',
            'party_size' => 'required|integer|min:1',
            'location' => 'required|string',
            'cuisine' => 'required|string',
            'time' => 'required|string',
        ]);

        $reservation->update($validated);

        return response()->json($reservation);
    }

    public function destroy($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
