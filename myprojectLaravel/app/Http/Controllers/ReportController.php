<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    // Get total count of users
    public function getUserCount()
    {
        try {
            $count = DB::table('users')->count();
            return response()->json([
                'count' => $count,
                'total_users' => $count // Alternative field name for compatibility
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching user count: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch user count'], 500);
        }
    }

    // Get total count of restaurants
    public function getRestaurantCount()
    {
        try {
            $count = DB::table('restaurants')->count();
            return response()->json([
                'count' => $count,
                'total_restaurants' => $count
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching restaurant count: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch restaurant count'], 500);
        }
    }

    // Get total count of reservations
    public function getReservationCount()
    {
        try {
            $count = DB::table('reservations')->count();
            return response()->json([
                'count' => $count,
                'total_reservations' => $count
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching reservation count: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch reservation count'], 500);
        }
    }

    // Get total count of tables used/occupied
    public function getTableCount()
    {
        try {
            // Count tables that are currently occupied or reserved
            $count = DB::table('tables')
                ->where('status', '!=', 'available')
                ->orWhere('status', 'occupied')
                ->orWhere('status', 'reserved')
                ->count();
            
            return response()->json([
                'count' => $count,
                'total_tables' => $count,
                'tables_used' => $count
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching table count: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch table count'], 500);
        }
    }

    // Detailed reservation report with date grouping
    public function getReservationReport()
    {
        try {
            $data = DB::table('reservations')
                ->select(
                    DB::raw('COUNT(*) as total'),
                    DB::raw('DATE(created_at) as date')
                )
                ->groupBy(DB::raw('DATE(created_at)'))
                ->orderBy('date', 'desc')
                ->limit(30) // Last 30 days
                ->get();

            return response()->json([
                'data' => $data,
                'total_count' => DB::table('reservations')->count()
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching reservation report: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch reservation report'], 500);
        }
    }

    // Table utilization report
    public function getTableUtilizationReport()
    {
        try {
            $data = DB::table('tables')
                ->select('id', 'status', 'table_number', 'capacity')
                ->get();

            $statusCounts = DB::table('tables')
                ->select('status', DB::raw('COUNT(*) as count'))
                ->groupBy('status')
                ->get();

            return response()->json([
                'data' => $data,
                'status_summary' => $statusCounts,
                'total_tables' => $data->count()
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching table utilization: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch table utilization'], 500);
        }
    }

    // Customer demographics report
    public function getCustomerDemographics()
    {
        try {
            // Get user demographics by role
            $roleData = DB::table('users')
                ->select('role', DB::raw('COUNT(*) as count'))
                ->groupBy('role')
                ->get();

            // Calculate percentages
            $totalUsers = DB::table('users')->count();
            $demographics = $roleData->map(function ($item) use ($totalUsers) {
                return [
                    'name' => ucfirst($item->role),
                    'value' => $totalUsers > 0 ? round(($item->count / $totalUsers) * 100, 1) : 0,
                    'count' => $item->count
                ];
            });

            return response()->json([
                'demographics' => $demographics,
                'total_users' => $totalUsers
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching customer demographics: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch customer demographics'], 500);
        }
    }

    // Cancellation and no-show report
    public function getCancellationReport()
    {
        try {
            // Get cancellation data by month
            $cancellationData = DB::table('reservations')
                ->select(
                    DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
                    DB::raw('COUNT(*) as total_reservations'),
                    DB::raw("SUM(CASE WHEN status = 'canceled' THEN 1 ELSE 0 END) as canceled"),
                    DB::raw("SUM(CASE WHEN status = 'no_show' THEN 1 ELSE 0 END) as no_shows")
                )
                ->groupBy(DB::raw("DATE_FORMAT(created_at, '%Y-%m')"))
                ->orderBy('month', 'desc')
                ->limit(6) // Last 6 months
                ->get();

            // Calculate rates
            $rates = $cancellationData->map(function ($item) {
                $cancellationRate = $item->total_reservations > 0 
                    ? round(($item->canceled / $item->total_reservations) * 100, 1) 
                    : 0;
                
                $noShowRate = $item->total_reservations > 0 
                    ? round(($item->no_shows / $item->total_reservations) * 100, 1) 
                    : 0;

                return [
                    'month' => $item->month,
                    'rate' => $cancellationRate,
                    'no_show_rate' => $noShowRate,
                    'canceled' => $item->canceled,
                    'no_shows' => $item->no_shows,
                    'total' => $item->total_reservations
                ];
            });

            return response()->json([
                'rates' => $rates,
                'summary' => [
                    'total_canceled' => DB::table('reservations')->where('status', 'canceled')->count(),
                    'total_no_shows' => DB::table('reservations')->where('status', 'no_show')->count(),
                    'total_reservations' => DB::table('reservations')->count()
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching cancellation report: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch cancellation report'], 500);
        }
    }

    // Combined dashboard data (single endpoint for all stats)
    public function getDashboardData()
    {
        try {
            $userCount = DB::table('users')->count();
            $restaurantCount = DB::table('restaurants')->count();
            $reservationCount = DB::table('reservations')->count();
            $tableCount = DB::table('tables')
                ->where('status', '!=', 'available')
                ->count();

            return response()->json([
                'users' => ['count' => $userCount],
                'restaurants' => ['count' => $restaurantCount],
                'reservations' => ['count' => $reservationCount],
                'tables' => ['count' => $tableCount],
                'summary' => [
                    'total_users' => $userCount,
                    'total_restaurants' => $restaurantCount,
                    'total_reservations' => $reservationCount,
                    'total_tables_used' => $tableCount
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching dashboard data: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch dashboard data'], 500);
        }
    }

    // Legacy methods for backward compatibility
    public function reservationReport()
    {
        return $this->getReservationReport();
    }

    public function tableUtilizationReport()
    {
        return $this->getTableUtilizationReport();
    }

    public function customerDemographicsReport()
    {
        return $this->getCustomerDemographics();
    }

    public function cancellationReport()
    {
        return $this->getCancellationReport();
    }

    public function userCount()
    {
        return $this->getUserCount();
    }
}