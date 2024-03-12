<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StagiaireAuthController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    // Administrateurs Auth
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Stagiaire Auth
    Route::post('/register', [StagiaireAuthController::class, 'register']);
    Route::post('/loginStg', [StagiaireAuthController::class, 'login']);
    Route::post('/logout', [StagiaireAuthController::class, 'logout']);
});
// stagiaires
    Route::get('/stagiaires', [StagiaireController::class, 'index']);
    Route::post('/AddStagiaire', [StagiaireController::class, 'store']);
    Route::delete('/DeleteStagiaires/{CIN}', [StagiaireController::class, 'destroy']);
    Route::put('/change-password', [StagiaireAuthController::class, 'changePassword']);
    Route::get('/stagiaires/{stagiaireId}/history', [StagiaireController::class, 'showHistory']);
    
    // Demandes
    Route::get('/demandes', [DemandeController::class, 'index']);
    Route::put('/UpdateDemande/{id}', [DemandeController::class, 'update']);
    Route::delete('/DeleteDemande/{id}', [DemandeController::class, 'destroy']);
    Route::put('/demandes/{id}/update-status', [DemandeController::class, 'updateStatus']);
    Route::get('/stagiaire/{id}/demande', [DemandeController::class, 'getDemandeByStagiaireId']);
    Route::get('/stagiaire/{id}/demandes', [DemandeController::class, 'getDemandesByStagiaireId']);
    
    // Administrateurs
    Route::post('/AddGestionnaire', [UserController::class, 'store']);
    Route::get('/gestionnaires', [UserController::class, 'index']);
    Route::delete('/DeleteGestionnaire/{id}', [UserController::class, 'destroy']);
    Route::put('/UpdateGestionnaire/{id}', [UserController::class, 'update']);
    Route::get('/gestionnaires/{id}/user-profile', [UserController::class, 'getUserProfile']);
