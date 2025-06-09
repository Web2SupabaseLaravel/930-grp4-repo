<?php

use App\Http\Controllers\customercontroller;
// use Laraveldemo\App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\API\usersapicpntroller;
use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\NotificationController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/CustomerMangemant',[customercontroller::class, 'index'])->name('customer.index'); 
Route::get('/CustomerMangemant/create',[customercontroller::class, 'create'])->name('customer.create'); 
Route::post('/CustomerMangemant',[customercontroller::class, 'store'])->name('customer.store'); 
Route::get('/CustomerMangemant/{customer}/edit',[customercontroller::class, 'edit'])->name('customer.edit'); 
Route::put('/CustomerMangemant/{customer}/update',[customercontroller::class, 'update'])->name('customer.update');
Route::delete('/CustomerMangemant/{customer}/delete',[customercontroller::class, 'delete'])->name('customer.delete');
Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');

Route::view('/', 'welcome');

Route::view('dashboard', 'dashboard')->name('dashboard');
Route::view('profile', 'profile')->name('profile');


Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
Route::get('/reservations/create', [ReservationController::class, 'create'])->name('reservations.create');
Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
Route::get('/reservations/{id}/edit', [ReservationController::class, 'edit'])->name('reservations.edit');
Route::put('/reservations/{id}', [ReservationController::class, 'update'])->name('reservations.update');
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy'])->name('reservations.destroy');



Route::get('/reservations/user/{id}', [customercontroller::class, 'getreservationbyuserid'])->name('reservations.getreservationbycustomerid');

Route::post('/register', [ApiController::class, 'register']);
Route::get('/users', [ApiController::class, 'getUsers']);
Route::get('/users/{id}', [ApiController::class, 'getUser']);
Route::put('/users/{id}', [ApiController::class, 'updateUser']);
Route::delete('/users/{id}', [ApiController::class, 'deleteUser']);
Route::post('/login', [ApiController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/profile', [ApiController::class, 'profile']);
});

Route::get('/notifications/user/{id}', [NotificationController::class, 'getnotification'])->name('notifications.getnotificationbyid');
