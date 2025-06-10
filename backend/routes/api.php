<?php

use App\Http\Controllers\API\ApiController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\API\RestaurantController;
use App\Http\Controllers\API\TablesController;
use App\Http\Controllers\Api\NotificationApiController;
use App\Http\Controllers\API\CustomerControllerApi;
use App\Http\Controllers\Api\ReservationApiController;
//Marah Api
Route::options('/{any}', function (Request $request) {
    return response('', 204)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})->where('any', '.*');
Route::get('/', function () {
    return view('welcome');
});

Route::post('/register', [ApiController::class, 'register']);
Route::get('/users', [ApiController::class, 'getUsers']);
Route::get('/users/{id}', [ApiController::class, 'getUser']);
Route::put('/users/{id}', [ApiController::class, 'updateUser']);
Route::delete('/users/{id}', [ApiController::class, 'deleteUser']);
Route::post('/login', [ApiController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/profile', [ApiController::class, 'profile']);
});
//Marah Api
//izz aldeen
Route::apiResource('restaurants', RestaurantController::class);


Route::prefix('restaurants/{restaurant}')->group(function () {
    Route::apiResource('tables', TablesController::class);
});



Route::apiResource("CustomerMangemant", CustomerControllerApi::class);
Route::apiResource('reservations', ReservationApiController::class);
Route::apiResource('users', ApiController::class);
Route::apiResource('Notification', NotificationApiController::class);

