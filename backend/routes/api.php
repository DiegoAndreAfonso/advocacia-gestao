<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LegalCaseController;

Route::post('/register', [RegistrationController::class, 'register']);
Route::post('/register/csv', [RegistrationController::class, 'registerCsv']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);
Route::get('/me', [LoginController::class, 'me']);

// profile
Route::get('/profile', [ProfileController::class, 'show']);
Route::put('/profile', [ProfileController::class, 'update']);

// cases for authenticated profile (client/lawyer)
Route::get('/profile/cases', [LegalCaseController::class, 'index']);
Route::post('/profile/cases', [LegalCaseController::class, 'store']);
