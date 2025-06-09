<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReservationController extends Controller
{
   protected $defaultRestaurantId = 'fbf8569e-3b52-433e-95ac-33a04b55f336';


    public function index(Request $request)
    {
        $query = Reservation::query();

        if ($request->filled('date')) {
            $query->where('date', $request->date);
        }

        if ($request->filled('party_size')) {
            $query->where('party_size', $request->party_size);
        }

        $reservations = $query->get();

        return view('reservations.form_reservation', [
            'reservations' => $reservations,
            'reservation' => new Reservation(),
            'route' => 'reservations.store',
            'method' => 'post',
            'titleForm' => 'Form Input Reservation',
            'submitButton' => 'Submit',
        ]);
    }

    public function create()
    {
        return view('reservations.form_reservation', [
            'reservation' => new Reservation(),
            'route' => 'reservations.store',
            'method' => 'post',
            'titleForm' => 'Create Reservation',
            'submitButton' => 'Submit',
        ]);
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

        $validated['restaurant_id'] = $this->defaultRestaurantId;

        Reservation::create($validated);

        return redirect()->route('reservations.index')->with('success', 'Reservation saved successfully!');
    }

    public function edit(string $id)
    {
        if (!Str::isUuid($id)) {
            abort(404);
        }

        $reservation = Reservation::findOrFail($id);

        return view('reservations.form_reservation', [
            'reservation' => $reservation,
            'route' => 'reservations.update',
            'method' => 'put',
            'titleForm' => 'Edit Reservation',
            'submitButton' => 'Update',
        ]);
    }

    public function update(Request $request, string $id)
    {
        if (!Str::isUuid($id)) {
            abort(404);
        }

        $validated = $request->validate([
            'date' => 'required|date',
            'duration' => 'required|string',
            'party_size' => 'required|integer|min:1',
            'location' => 'required|string',
            'cuisine' => 'required|string',
            'time' => 'required|string',
        ]);

        $reservation = Reservation::findOrFail($id);

        $reservation->update($validated);

        return redirect()->route('reservations.index')->with('success', 'Reservation updated successfully!');
    }

    public function destroy(string $id)
    {
        if (!Str::isUuid($id)) {
            abort(404);
        }

        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return redirect()->route('reservations.index')->with('success', 'Reservation deleted successfully!');
    }
}
