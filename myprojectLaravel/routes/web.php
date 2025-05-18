<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReportController;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', function () {
    return view('admin.reports.test'); // عرض صفحة الفورم التي أنشأتها
});



// Routes for ReportController
Route::prefix('reports')->group(function () {
    Route::get('/reservations', [ReportController::class, 'reservationReport'])->name('reports.reservations');
    Route::get('/table-utilization', [ReportController::class, 'tableUtilizationReport'])->name('reports.tableUtilization');
    Route::get('/customer-demographics', [ReportController::class, 'customerDemographicsReport'])->name('reports.customerDemographics');
    Route::get('/cancellations', [ReportController::class, 'cancellationReport'])->name('reports.cancellations');
    Route::get('/user-count', [ReportController::class, 'userCount'])->name('reports.userCount'); // For user count
});

Route::get('/reports/test', function () {
    return view('admin.reports.test');
})->name('reports.test');


require __DIR__.'/auth.php';
