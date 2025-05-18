<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    // Number of Reservations
    public function reservationReport()
    {
        $data = DB::table('reservations')
            ->select(DB::raw('COUNT(*) as total'), DB::raw('DATE(reservation_time) as date'))
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($data); 
    }

    // Table Usage
    public function tableUtilizationReport()
    {
        $data = DB::table('tables')
            ->select('id', 'status') 
            ->get();

        return response()->json($data);
    }

    // Customer Statistics
    public function customerDemographicsReport()
    {
        $data = DB::table('users')
            ->select(DB::raw('COUNT(*) as total'), 'role') 
            ->groupBy('role')
            ->get();

        return response()->json($data);
    }

    //Cancellations
    public function cancellationReport()
    {
        $data = DB::table('reservations')
            ->select(DB::raw('COUNT(*) as total'), DB::raw('DATE(reservation_time) as date'))
            ->where('status', 'canceled') 
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($data);
    }

   // Number of Users

    public function userCount()
    {
        $userCount = DB::table('users')->count();
        return response()->json(['total_users' => $userCount]);
    }
}
