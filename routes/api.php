<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TableManagementController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes لعمليات CRUD لجدول tables
Route::apiResource('tables', TableController::class);


Route::get('/tables', [TableController::class, 'index']);

// Routes لإدارة الطاولات (Table Management)
Route::prefix('tables')->group(function () {
    Route::get('reservations/{restaurantId}', [TableManagementController::class, 'viewReservationSchedule']);
    Route::post('assign/{reservationId}', [TableManagementController::class, 'assignTable']);
    Route::put('status/{tableId}', [TableManagementController::class, 'updateTableStatus']);
    Route::delete('reservations/{reservationId}', [TableManagementController::class, 'deleteReservation']);
});
