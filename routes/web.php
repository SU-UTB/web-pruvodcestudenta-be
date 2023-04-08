<?php

use App\Http\Controllers\Admin\AdminContentsController;
use App\Http\Controllers\Admin\AdminLandingController;
use App\Http\Controllers\Admin\AdminSectionsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/admin', [AdminLandingController::class, 'index'])->name('dashboard');

    Route::get('/admin/sections', [AdminSectionsController::class, 'index'])->name('admin.sections');
    Route::put('/admin/sections/{id}', [AdminSectionsController::class, 'update'])->name('admin.sections.update');

    Route::get('/admin/topics', [AdminContentsController::class, 'index'])->name('admin.topics');
    Route::put('/admin/topics/{id}', [AdminContentsController::class, 'update'])->name('admin.topics.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
