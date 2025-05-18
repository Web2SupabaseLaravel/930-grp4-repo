<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::view('/', 'welcome');

Route::view('dashboard', 'dashboard')->name('dashboard');
Route::view('profile', 'profile')->name('profile');



// عرض صفحة إنشاء حجز جديد
Route::get('reservations/create', [ReservationController::class, 'create'])->name('reservations.create');

// تخزين حجز جديد
Route::post('reservations/store', [ReservationController::class, 'store'])->name('reservations.store');

// عرض كل الحجوزات
Route::get('reservations', [ReservationController::class, 'index'])->name('reservations.index');

// حذف حجز
Route::delete('reservations/{id}', [ReservationController::class, 'destroy'])->name('reservations.destroy');

// تعديل حجز
Route::put('reservations/{id}', [ReservationController::class, 'update'])->name('reservations.update');

// عرض صفحة تعديل الحجز
Route::get('reservations/{id}/edit', [ReservationController::class, 'edit'])->name('reservations.edit');

Route::resource('reservations', ReservationController::class);
