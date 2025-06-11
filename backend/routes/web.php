<?php

use App\Http\Controllers\API\ApiController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\customercontroller;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\API\usersapicpntroller;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;





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
Route::get('/reports/test', function () {
    return view('admin.reports.test');
})->name('reports.test');


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

use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\TablesController;


Route::get('/', function () {
    return view('welcome');
});

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard', function () {
    return response()->json(['message' => 'Dashboard route placeholder']);
})->name('dashboard');



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





Route::get('/CustomerMangemant',[customercontroller::class, 'index'])->name('customer.index'); 
Route::get('/CustomerMangemant/create',[customercontroller::class, 'create'])->name('customer.create'); 
Route::post('/CustomerMangemant',[customercontroller::class, 'store'])->name('customer.store'); 
Route::get('/CustomerMangemant/{customer}/edit',[customercontroller::class, 'edit'])->name('customer.edit'); 
Route::put('/CustomerMangemant/{customer}/update',[customercontroller::class, 'update'])->name('customer.update');
Route::delete('/CustomerMangemant/{customer}/delete',[customercontroller::class, 'delete'])->name('customer.delete');
Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
Route::get('/notifications/user/{id}', [NotificationController::class, 'getnotification'])->name('notifications.getnotificationbyid');

Route::prefix('reports')->group(function () {
    Route::get('/reservations', [ReportController::class, 'reservationReport'])->name('reports.reservations');
    Route::get('/table-utilization', [ReportController::class, 'tableUtilizationReport'])->name('reports.tableUtilization');
    Route::get('/customer-demographics', [ReportController::class, 'customerDemographicsReport'])->name('reports.customerDemographics');
    Route::get('/cancellations', [ReportController::class, 'cancellationReport'])->name('reports.cancellations');
    Route::get('/user-count', [ReportController::class, 'userCount'])->name('reports.userCount'); // For user count
});

require __DIR__.'/auth.php';
