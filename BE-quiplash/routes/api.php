<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\QuipController;
use App\Http\Controllers\PlayerController;

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
Route::post('createGame', [GameController::class, 'store']);
Route::post('startGame', [GameController::class, 'start']);
Route::post('cleanData', [GameController::class, 'cleanData']);


//Player routes
Route::get('getPlayers/{roomNumber}', [PlayerController::class, 'index']);
Route::post('createPlayer', [PlayerController::class, 'store']);
