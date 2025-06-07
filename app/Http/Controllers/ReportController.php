<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    // Number of Reservations
    public function reservationReport()
    {
       
    $data = DB::table('reservations')
    ->select(DB::raw('COUNT(*) as total'), DB::raw("to_char(updated_at, 'YYYY-MM-DD') as date"))
    ->groupBy(DB::raw("to_char(updated_at, 'YYYY-MM-DD')"))
    ->orderBy('date', 'desc')
    ->get();
    return response()->json(['data' => $data]);

       
    }

    // Table Usage
    public function tableUtilizationReport()
    {
        $data = DB::table('tables')
            ->select('id', 'status')
            ->get();

        return response()->json(['data' => $data]);
    }

    //Customer Statistics
    public function customerDemographicsReport()
    {
        $data = DB::table('')
            ->select(DB::raw('COUNT(*) as total'), 'role')
            ->groupBy('role')
            ->get();

        return response()->json(['data' => $data]);
    }



    public function cancellationReport()
{
    $data = DB::table('reservations')
        ->select(DB::raw('COUNT(*) as total'), DB::raw('DATE(created_at) as date'))
        ->where('status', 'canceled')
        ->groupBy(DB::raw('DATE(created_at)'))
        ->orderBy('date', 'desc')
        ->get();

    return response()->json(['data' => $data]);
}


    // Number of Users
    public function userCount()
    {
        $userCount = DB::table('users')->count();

        return response()->json(['total_users' => $userCount]);
    }
}
