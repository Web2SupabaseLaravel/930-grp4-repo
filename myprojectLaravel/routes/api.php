<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ReportController Routes
Route::prefix('reports')->group(function () {
    // Individual count endpoints
    Route::get('/users', [ReportController::class, 'getUserCount'])->name('api.reports.users');
    Route::get('/restaurants', [ReportController::class, 'getRestaurantCount'])->name('api.reports.restaurants');
    Route::get('/reservations', [ReportController::class, 'getReservationCount'])->name('api.reports.reservations');
    Route::get('/tables', [ReportController::class, 'getTableCount'])->name('api.reports.tables');
    
    // Detailed report endpoints
    Route::get('/reservation-report', [ReportController::class, 'getReservationReport'])->name('api.reports.reservationReport');
    Route::get('/table-utilization', [ReportController::class, 'getTableUtilizationReport'])->name('api.reports.tableUtilization');
    Route::get('/customer-demographics', [ReportController::class, 'getCustomerDemographics'])->name('api.reports.customerDemographics');
    Route::get('/cancellations', [ReportController::class, 'getCancellationReport'])->name('api.reports.cancellations');
    
    // Legacy endpoints for backward compatibility
    Route::get('/user-count', [ReportController::class, 'getUserCount'])->name('api.reports.userCount');
    
    // Combined dashboard data endpoint
    Route::get('/dashboard', [ReportController::class, 'getDashboardData'])->name('api.reports.dashboard');
});


// Notifications
Route::apiResource('notifications', NotificationController::class);
// // Debug endpoint
Route::get('/debug/database', [ReportController::class, 'debugDatabase']);