<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\API\RestaurantController;
use App\Http\Controllers\API\TablesController;

// Izz Al-deen
Route::apiResource('restaurants', RestaurantController::class);


Route::prefix('restaurants/{restaurant}')->group(function () {
    // ali
    Route::apiResource('tables', TablesController::class);
});

// sondos
Route::apiResource('reservations', ReservationApiController::class);

// saja
Route::prefix('reports')->group(function () {
     Route::get('/reservations', [ReportController::class, 'reservationReport'])->name('api.reports.reservations'); 
     Route::get('/table-utilization', [ReportController::class, 'tableUtilizationReport'])->name('api.reports.tableUtilization'); 
     Route::get('/customer-demographics', [ReportController::class, 'customerDemographicsReport'])->name('api.reports.customerDemographics');
     Route::get('/cancellations', [ReportController::class, 'cancellationReport'])->name('api.reports.cancellations'); 
     Route::get('/user-count', [ReportController::class, 'userCount'])->name('api.reports.userCount');
     Route::get('/reports/reservations', [ReportController::class, 'reservationReport']);
});
Route::apiResource('notifications', NotificationController::class);

//hani
Route::apiResource("CustomerManagement", CustomerControllerApi::class);





Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
