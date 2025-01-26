<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminChirpController;
use App\Http\Controllers\UserManageController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified', 'role_or_permission:menu-chirp|admin']);
    
Route::middleware(['auth', 'role:admin'])
    ->resource('usermanager', UserManageController::class)
    ->only(['index', 'update', 'destroy'])
;
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/chirps', [AdminChirpController::class, 'index'])->name('admin.chirps.index');
    Route::delete('/admin/chirps/{chirp}', [AdminChirpController::class, 'destroy'])->name('admin.chirps.destroy');
    Route::put('/admin/chirps/{chirp}', [AdminChirpController::class, 'markAsReviewed'])->name('admin.chirps.update');
});

Route::middleware(['auth', 'role:admin'])
    ->resource('adminChirps', AdminChirpController::class)
    ->only(['index', 'update', 'destroy'])
;
require __DIR__.'/auth.php';
