<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StagiaireAuthController;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);

    // Route::post('/register', [AuthController::class, 'register']);
    Route::post('/register', [StagiaireAuthController::class, 'register']);
    Route::post('/loginStg', [StagiaireAuthController::class, 'login']);
    Route::post('/logout', [StagiaireAuthController::class, 'logout']);


    // // stagiaires
    // Route::get('/stagiaires', [StagiaireController::class, 'index']);
    // Route::post('/AddStagiaire', [StagiaireController::class, 'store']);
    // Route::delete('/DeleteStagiaires/{CIN}', [StagiaireController::class, 'destroy']);

    // // gestionnaires
    // Route::post('/AddGestionnaire', [UserController::class, 'store']);
    // Route::get('/gestionnaires', [UserController::class, 'index']);
    // Route::delete('/DeleteGestionnaire/{id}', [UserController::class, 'destroy']);
    // Route::put('/UpdateGestionnaire/{id}', [UserController::class, 'update']);

});

    // stagiaires
    Route::get('/stagiaires', [StagiaireController::class, 'index']);
    // Route::get('/stagiaires', [DemandeController::class, 'index']);
    Route::post('/AddStagiaire', [StagiaireController::class, 'store']);
    Route::delete('/DeleteStagiaires/{CIN}', [StagiaireController::class, 'destroy']);
    Route::put('/UpdateDemande/{id}', [DemandeController::class, 'update']);

    // gestionnaires
    Route::post('/AddGestionnaire', [UserController::class, 'store']);
    Route::get('/gestionnaires', [UserController::class, 'index']);
    Route::delete('/DeleteGestionnaire/{id}', [UserController::class, 'destroy']);
    Route::put('/UpdateGestionnaire/{id}', [UserController::class, 'update']);
