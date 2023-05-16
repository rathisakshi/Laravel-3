<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\RentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup',[UserController::class,'Signup']);
Route::post('/login',[UserController::class,'Login']);

Route::get('/cars', [CarController::class, 'index']);
Route::post('/cars/create', [CarController::class, 'store']);
Route::post('/cars/{id}', [CarController::class, 'update']);
Route::get('/cars/edit/{id}', [CarController::class, 'edit']);
Route::delete('/delete{id}', [CarController::class, 'destroy']);
Route::post('/rentals/create', [RentController::class, 'store']);
Route::get('/carinfo/{id}', [RentController::class, 'carinfo']);
Route::get('/userinfo', [RentController::class, 'userinfo']);
Route::delete('/rentend/{id}', [RentController::class, 'rentend']);

