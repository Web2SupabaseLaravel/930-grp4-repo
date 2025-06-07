<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\TablesController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/restaurants', [RestaurantController::class, 'index'])->name('restaurants.index');
Route::get('/restaurants/create', [RestaurantController::class, 'create'])->name('restaurants.create');
Route::get('/restaurants/{restaurant}', [RestaurantController::class, 'show'])->name('restaurants.show');
Route::post('/restaurants', [RestaurantController::class, 'store'])->name('restaurants.store');
Route::get('/restaurants/{restaurant}/edit', [RestaurantController::class, 'edit'])->name('restaurants.edit');
Route::put('/restaurants/{restaurant}', [RestaurantController::class, 'update'])->name('restaurants.update');
Route::delete('/restaurants/{restaurant}', [RestaurantController::class, 'destroy'])->name('restaurants.destroy');


Route::prefix('restaurants/{restaurant}')->group(function () {
    Route::get('/tables', [TablesController::class, 'index'])->name('tables.index');
    Route::get('/tables/create', [TablesController::class, 'create'])->name('tables.create');
    Route::post('/tables', [TablesController::class, 'store'])->name('tables.store');
    Route::get('/tables/{table}/edit', [TablesController::class, 'edit'])->name('tables.edit');
    Route::put('/tables/{table}', [TablesController::class, 'update'])->name('tables.update');
    Route::delete('/tables/{table}', [TablesController::class, 'destroy'])->name('tables.destroy');
});

//saja

Route::get('/', function () {
    return view('admin.reports.test'); 
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


//Routes for ReportController
Route::resource('notifications', NotificationController::class);


//sondos
Route::view('/', 'welcome');

Route::view('dashboard', 'dashboard')->name('dashboard');
Route::view('profile', 'profile')->name('profile');


Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
Route::get('/reservations/create', [ReservationController::class, 'create'])->name('reservations.create');
Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
Route::get('/reservations/{id}/edit', [ReservationController::class, 'edit'])->name('reservations.edit');
Route::put('/reservations/{id}', [ReservationController::class, 'update'])->name('reservations.update');
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy'])->name('reservations.destroy');


//hani
Route::get('/CustomerMangemant',[customercontroller::class, 'index'])->name('customer.index'); 
Route::get('/CustomerMangemant/create',[customercontroller::class, 'create'])->name('customer.create'); 
Route::post('/CustomerMangemant',[customercontroller::class, 'store'])->name('customer.store'); 
Route::get('/CustomerMangemant/{customer}/edit',[customercontroller::class, 'edit'])->name('customer.edit'); 
Route::put('/CustomerMangemant/{customer}/update',[customercontroller::class, 'update'])->name('customer.update');
Route::delete('/CustomerMangemant/{customer}/delete',[customercontroller::class, 'delete'])->name('customer.delete');

//marah
Route::resource('items', ItemController::class);





require __DIR__.'/auth.php';
