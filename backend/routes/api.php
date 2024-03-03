<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\AdministrateurController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// stagiaires
Route::get('/stagiaires', [StagiaireController::class, 'index']);
Route::post('/AddStagiaire', [StagiaireController::class, 'store']);
Route::delete('/DeleteStagiaires/{CIN}', [StagiaireController::class, 'destroy']);

// gestionnaires
Route::post('/AddGestionnaire', [AdministrateurController::class, 'store']);
Route::get('/gestionnaires', [AdministrateurController::class, 'index']);
Route::delete('/DeleteGestionnaire/{id}', [AdministrateurController::class, 'destroy']);
Route::put('/UpdateGestionnaire/{id}', [AdministrateurController::class, 'update']);
