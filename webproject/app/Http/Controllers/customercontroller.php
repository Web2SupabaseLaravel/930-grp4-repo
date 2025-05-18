<?php

namespace App\Http\Controllers;
use App\Models\customermangemant;
use Illuminate\Http\Request;

class customercontroller extends Controller
{

    public function index(){
        $customers = customermangemant::all();
        return view('customer.index', ['customers'=>$customers]);
        
    }
    public function create(){
        return view("customer.create");
    }
    public function store(Request $request){
        $data = $request->validate([
            "name"=> "required",
            "email"=> "required",
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
        ]);
        $customer->update($data);
        return redirect(route("customer.index"))-> with("success","customer update succsesfully");

    }
    public function delete(customermangemant $customer){
        $customer->delete();
        return redirect(route("customer.index"))->with("success","customer succesfully deleted");
        
    }
}
