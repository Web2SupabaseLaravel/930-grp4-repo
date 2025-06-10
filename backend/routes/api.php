<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TableManagementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;

    Route::apiResource('reservations', ReservationController::class);
    Route::apiResource('tables', TableController::class);

    Route::prefix('tables')->group(function () {
        Route::get('reservations/{restaurantId}', [TableManagementController::class, 'viewReservationSchedule']);
        Route::post('assign/{reservationId}', [TableManagementController::class, 'assignTable']);
        Route::put('status/{tableId}', [TableManagementController::class, 'updateTableStatus']);
        Route::delete('reservations/{reservationId}', [TableManagementController::class, 'deleteReservation']);
    });
