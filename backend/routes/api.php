<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PasswordController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\TranslationController;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [PasswordController::class, 'sendResetLinkEmail']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});

// Translation proxy (Portuguese is the base language on the frontend).
Route::post('translate', [TranslationController::class, 'translate']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('usuarios', UsuarioController::class);
});
