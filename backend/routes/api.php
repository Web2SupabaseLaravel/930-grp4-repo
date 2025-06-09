<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CustomerControllerApi;
use App\Http\Controllers\Api\ReservationApiController;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\NotificationApiController;

Route::apiResource("CustomerMangemant", CustomerControllerApi::class);
Route::apiResource('reservations', ReservationApiController::class);
Route::apiResource('users', ApiController::class);
Route::apiResource('Notification', NotificationApiController::class);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
