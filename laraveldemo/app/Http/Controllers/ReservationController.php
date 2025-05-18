<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // استخدام where لمقارنة UUID كسلسلة نصية
        $query = Reservation::where('reserved_by_user_id', Auth::user()->id);

        // فلترة حسب التاريخ
        if ($request->filled('date')) {
            $query->where('date', $request->date);
        }

        // فلترة حسب الحالة
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // فلترة حسب عدد الأشخاص
        if ($request->filled('party_size')) {
            $query->where('party_size', $request->party_size);
        }

        $reservations = $query->get();

        // عرض قائمة الحجوزات
        return view('reservations.form_reservation', ['reservations' => $reservations, 'reservation' => new \App\Models\Reservation(), 'route' => 'reservations.store', 'method' => 'post', 'titleForm' => 'Form Input Reservation', 'submitButton' => 'Submit']);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['reservation'] = new Reservation();
        $data['route'] = 'reservations.store';
        $data['method'] = 'post';
        $data['titleForm'] = 'Form Input Reservation';
        $data['submitButton'] = 'Submit';

        return view('reservations.form_reservation', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $validated = $request->validate([
        'restaurant_id' => 'required|uuid',
        'date' => 'required|date',
        'duration' => 'required|string',
        'special_req' => 'nullable|string',
        'party_size' => 'required|integer|min:1',
        'status' => 'required|string',
        'location' => 'required|string',
        'cuisine' => 'required|string',
        'timr'=>'required|string'
    ]);

    $inputTime = $request->hour . ':' . $request->minute . ' ' . $request->ampm;
    $time24 = date("H:i:s", strtotime($inputTime));

    $data = [
        'restaurant_id' => $validated['restaurant_id'],
        'date' => $validated['date'],
        'duration' => $validated['duration'],
        'special_req' => $validated['special_req'] ?? null,
        'party_size' => $validated['party_size'],
        'status' => $validated['status'],
        'location' => $validated['location'],
        'cuisine' => $validated['cuisine'],
        'time' => $time24,
        'reserved_by_user_id' => Auth::id(), // أو UUID
    ];

    // إرسال البيانات إلى Supabase
    $response = Http::withHeaders([
        'apikey' => env('SUPABASE_API_KEY'),
        'Authorization' => 'Bearer ' . env('SUPABASE_API_KEY'),
        'Content-Type' => 'application/json',
        'Prefer' => 'return=representation'
    ])->post(env('SUPABASE_URL') . '/rest/v1/reservations', $data);

    if ($response->successful()) {
        return response()->json([
            'message' => 'تم حفظ الحجز في Supabase بنجاح',
            'data' => $response->json(),
        ], 201);
    }

    return response()->json([
        'message' => 'فشل في حفظ الحجز في Supabase',
        'error' => $response->body(),
    ], 500);
}
    public function edit(string $id)
    {
        // جلب الحجز حسب الـ UUID أو إظهار 404
        $reservation = Reservation::findOrFail($id);

        $data['reservation']   = $reservation;
        $data['route']         = 'reservations.update';
        $data['method']        = 'put';
        $data['titleForm']     = 'Edit Reservation';
        $data['submitButton']  = 'Update';

        dd($response->status(), $response->body());

        return view('reservations.form_reservation', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // التحقق من صحة البيانات مع استبعاد reserved_by_user_id
        $request->validate([
            'managed_by_user_id' => 'nullable|uuid',
            'restaurant_id'      => 'required|uuid',
            'date'               => 'required|date',
            'duration'           => 'required|string',
            'special_req'        => 'nullable|string',
            'party_size'         => 'required|integer',
            'status'             => 'required|string',
        ]);

        // جلب الحجز وتحديثه
        $reservation = Reservation::findOrFail($id);
        $reservation->update($request->all());

        return redirect()->route('reservations.index')
                         ->with('success', 'Reservation updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return redirect()->route('reservations.index')
                         ->with('success', 'Reservation deleted successfully!');
    }

    
}
