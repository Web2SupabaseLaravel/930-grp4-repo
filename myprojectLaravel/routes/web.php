<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });
use App\Http\Controllers\ReportController;

// Routes for ReportController
Route::prefix('reports')->group(function () {
    Route::get('/reservations', [ReportController::class, 'reservationReport'])->name('reports.reservations');
    Route::get('/table-utilization', [ReportController::class, 'tableUtilizationReport'])->name('reports.tableUtilization');
    Route::get('/customer-demographics', [ReportController::class, 'customerDemographicsReport'])->name('reports.customerDemographics');
    Route::get('/cancellations', [ReportController::class, 'cancellationReport'])->name('reports.cancellations');
    Route::get('/user-count', [ReportController::class, 'userCount'])->name('reports.userCount'); // For user count
});

require __DIR__.'/auth.php';
