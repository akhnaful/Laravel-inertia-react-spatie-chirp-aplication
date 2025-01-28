<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminChirpController;
use App\Http\Controllers\UserManageController;
use App\Http\Controllers\ReportManagerController;

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

Route::post("/chirps/{chirp}/report", [ChirpController::class, 'report'])
    ->middleware(['auth', 'verified'])
    ->name("chirps.report");

Route::post("/user/{user}/report", [ProfileController::class, 'report'])
    ->middleware(['auth', 'verified'])
    ->name("user.report");

Route::resource('report', ReportManagerController::class)
    ->middleware(['auth', 'role:admin'])
    ->only(['index', 'destroy', 'update']);

require __DIR__.'/auth.php';
