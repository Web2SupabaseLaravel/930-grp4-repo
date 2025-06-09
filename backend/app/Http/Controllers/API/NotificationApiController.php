<?php

namespace App\Http\Controllers\Api;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;




class NotificationApiController extends Controller
{
  public function getnotification($id)
{
    
    $notifications = Notification::where('user_id', $id)->get();

    return response()->json([
        'notifications' => $notifications
    ]);
}
    public function index()
{
    $notifications = Notification::all();
    return view('notifications.notifications', compact('notifications'));
}

    public function create()
    {
        return view('notifications.create');
    }

  public function store(Request $request)
{
    
    $request->validate([
        'title' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    
    Notification::create([
        'title' => $request->title,
        'message' => $request->message,
        'type' => $request->type, 
        'is_read' => false, 
    ]);

    return redirect()->route('notifications.index')->with('success', 'Notification created successfully!');
}


    public function show($id)
    {
        $notification = Notification::findOrFail($id);
        return view('notifications.show', compact('notification'));
    }

    public function edit($id)
    {
        $notification = Notification::findOrFail($id);
        return view('notifications.edit', compact('notification'));
    }

    public function update(Request $request, $id)
    {
        $notification = Notification::findOrFail($id);
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'message' => 'sometimes|string',
        ]);

        $notification->update($request->all());

        return redirect()->route('notifications.index')->with('success', 'Notification updated successfully!');
    }

    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return redirect()->route('notifications.index')->with('success', 'Notification deleted successfully!');
    }
}


