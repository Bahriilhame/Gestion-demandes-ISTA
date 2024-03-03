<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StagiaireController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/stagiaires', [StagiaireController::class, 'index']);
Route::post('/stagiaires', [StagiaireController::class, 'store']);
Route::delete('/stagiaires/{CIN}', [StagiaireController::class, 'destroy']);