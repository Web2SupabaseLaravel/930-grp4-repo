<?php

namespace App\Http\Controllers;
use App\Models\customermangemant;
use Illuminate\Http\Request;
use App\Models\Reservation;
use Illuminate\Support\Str;
class customercontroller extends Controller
{

public function getReservationByUserId($id)
{

    $reservations = Reservation::where('reserved_by_user_id', $id)->get();

    return response()->json(['reservations' => $reservations]);
}
    public function index(){
        $customers = customermangemant::all();
    $reservations = Reservation::all(); 

    return view('customer.index', [
        'customers' => $customers,
        'reservations' => $reservations, // Pass it to the view
    ]);
        
    }
    public function create(){
        return view("customer.create");
    }
    public function store(Request $request){
        $data = $request->validate([
            "name"=> "required",
            "email"=> "required",
            "phone_number"=> "required",
            "special_requests"=> "required"
        ]);
        $newcustomermangemant = customermangemant::create($data);
        return redirect(route('customer.index'));
    }
    public function edit(customermangemant $customer){
        return view('customer.edit', ['customer'=>$customer]);
    }
    public function update(Request $request,customermangemant $customer){
         $data = $request->validate([
            "name"=> "required",
            "email"=> "required",
             "phone_number"=> "required",
             "special_requests"=> "required"
        ]);
        $customer->update($data);
        return redirect(route("customer.index"))-> with("success","customer update succsesfully");

    }
    public function delete(customermangemant $customer){
        $customer->delete();
        return redirect(route("customer.index"))->with("success","customer succesfully deleted");
        
    }
}
