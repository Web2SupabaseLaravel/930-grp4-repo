<?php

namespace App\Http\Controllers;
use App\Models\customermangemant;
use Illuminate\Http\Request;

class customercontroller extends Controller
{

    public function index(){
        return view("customer.index");
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
}
