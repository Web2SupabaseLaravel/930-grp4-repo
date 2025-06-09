<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\API\RestaurantController;
use App\Http\Controllers\API\TablesController;


Route::apiResource('restaurants', RestaurantController::class);


Route::prefix('restaurants/{restaurant}')->group(function () {
    Route::apiResource('tables', TablesController::class);
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
