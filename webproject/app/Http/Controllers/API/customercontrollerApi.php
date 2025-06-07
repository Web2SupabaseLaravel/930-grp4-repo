<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\customermangemant;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Models\User;

 
class CustomerControllerApi extends Controller
{
   public function getreservationbyuserid($id) {
        $reservations = Reservation::where('reserved_by_user_id', $id)->get();

        return response()->json([
            'reservations' => $reservations
        ]);
}
    public function index() {
        $customers = customermangemant::all();
       $reservations = Reservation::all();
       $user = User::all();


     return response()->json([
        'success' => true,
        'customers' => $customers,
        'users'=> $user,
        'reservations' => $reservations
    ]);
        
    }

    public function store(Request $request) {
        $data = $request->validate([
            "name" => "required",
            "email" => "required|email",
            "phone_number" => "required",
            "special_requests" => "required"
        ]);

        $newCustomer = customermangemant::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Customer created successfully.',
            'data' => $newCustomer
        ], 201);
    }

    public function show(customermangemant $customerMangeman) {
        return response()->json([
            'success' => true,
            'data' => $customerMangeman
        ]);
    }

    public function update(Request $request, customermangemant $customerMangeman) {
        $data = $request->validate([
            "name" => "required",
            "email" => "required|email",
            "phone_number" => "required",
            "special_requests" => "required"
        ]);

        $customerMangeman->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Customer updated successfully.',
            'data' => $customerMangeman
        ]);
    }

    public function destroy(customermangemant $customerMangeman) {
        $customerMangeman->delete();

        return response()->json([
            'success' => true,
            'message' => 'Customer deleted successfully.'
        ]);
    }
}
