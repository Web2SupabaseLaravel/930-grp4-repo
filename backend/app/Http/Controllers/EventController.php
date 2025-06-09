<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['event'] = new \App\Models\Event(); 
        $data['route'] = 'dataevent.store'; 
        $data['method'] = 'post';
        $data['titleForm'] = 'Form Input Event'; 
        $data['submitButton'] = Submit;
        return view('event/form_event', $data); 

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $request->validate([
        'name' => 'required',
        'event_date' => 'required', 
        'event_topic' => 'required', 
    ]);

    $inputEvent = new \App\Models\Event(); 
    $inputEvent->name = $request->name;
    $inputEvent->event_date = $request->event_date;  
    $inputEvent->event_topic = $request->event_topic; 
    $inputEvent->save();
    return redirect('dataevent/create'); 

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
