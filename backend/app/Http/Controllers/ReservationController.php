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

        $reservations = $query->with('table')->get();

        return response()->json([
            'status' => 'success',
            'data' => $reservations,
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

        $reservation = Reservation::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation saved successfully!',
            'data' => $reservation,
        ], 201);
    }

    public function show(string $id)
    {
        if (!Str::isUuid($id)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid reservation ID',
            ], 404);
        }

        $reservation = Reservation::with('table')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $reservation,
        ]);
    }

    public function update(Request $request, string $id)
    {
        if (!Str::isUuid($id)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid reservation ID',
            ], 404);
        }

        // تحسين القواعد التحققية للسماح بتحديث حالة الحجز
        $validated = $request->validate([
            'status' => 'sometimes|in:pending,confirmed,cancelled', // 'sometimes' للسماح بتحديث حقل واحد
            'date' => 'sometimes|date',
            'duration' => 'sometimes|string',
            'party_size' => 'sometimes|integer|min:1',
            'location' => 'sometimes|string',
            'cuisine' => 'sometimes|string',
            'time' => 'sometimes|string',
        ]);

        $reservation = Reservation::findOrFail($id);

        // تحديث فقط الحقول المرسلة
        $reservation->update(array_filter($validated));

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation updated successfully!',
            'data' => $reservation->fresh(), // إعادة تحميل البيانات المحدثة
        ]);
    }

    public function destroy(string $id)
    {
        if (!Str::isUuid($id)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid reservation ID',
            ], 404);
        }

        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation deleted successfully!',
        ]);
    }
}