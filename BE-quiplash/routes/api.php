<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\QuipController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


//Quip routes
Route::get('quips', [QuipController::class, 'index']);

//Game routes
Route::post('createGame', [GameController::class, 'create']);
Route::post('joinGame', [GameController::class, 'join']);
