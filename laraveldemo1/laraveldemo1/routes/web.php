<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/my-feature', function () {
    return 'Hello from ali branch!';
});