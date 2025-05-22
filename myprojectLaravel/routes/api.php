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

// ReportController
Route::prefix('reports')->group(function () {
     Route::get('/reservations', [ReportController::class, 'reservationReport'])->name('api.reports.reservations'); 
     Route::get('/table-utilization', [ReportController::class, 'tableUtilizationReport'])->name('api.reports.tableUtilization'); 
     Route::get('/customer-demographics', [ReportController::class, 'customerDemographicsReport'])->name('api.reports.customerDemographics');
     Route::get('/cancellations', [ReportController::class, 'cancellationReport'])->name('api.reports.cancellations'); 
     Route::get('/user-count', [ReportController::class, 'userCount'])->name('api.reports.userCount');
     Route::get('/reports/reservations', [ReportController::class, 'reservationReport']);
});

// Notifications
Route::apiResource('notifications', NotificationController::class);
