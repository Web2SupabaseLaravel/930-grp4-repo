<?php

use App\Http\Controllers\customercontroller;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/CustomerMangemant',[customercontroller::class, 'index'])->name('customer.index'); 
Route::get('/CustomerMangemant/create',[customercontroller::class, 'create'])->name('customer.create'); 
Route::post('/CustomerMangemant',[customercontroller::class, 'store'])->name('customer.store'); 
Route::get('/CustomerMangemant/{customer}/edit',[customercontroller::class, 'edit'])->name('customer.edit'); 
Route::put('/CustomerMangemant/{customer}/update',[customercontroller::class, 'update'])->name('customer.update');
Route::delete('/CustomerMangemant/{customer}/delete',[customercontroller::class, 'delete'])->name('customer.delete');