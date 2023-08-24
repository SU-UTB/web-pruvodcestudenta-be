<?php

use App\Http\Controllers\Admin\AdminLandingController;
use App\Http\Controllers\Admin\AdminSectionsController;
use App\Http\Controllers\Admin\AdminTopicsController;
use App\Http\Controllers\Admin\LocationsController;
use App\Http\Controllers\Admin\LogsController;
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

Route::get('/admin/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/admin/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/admin/', [AdminLandingController::class, 'index'])->name('dashboard');

    Route::get('/admin/sections/', [AdminSectionsController::class, 'index'])->name('sections');
    Route::post('/admin/sections/search/', [AdminSectionsController::class, 'sectionsSearch'])->name('search-sections');
    Route::put('/admin/sections/{id}/', [AdminSectionsController::class, 'update'])->name('saveSection');
    Route::get('/admin/sections/{id}/', [AdminSectionsController::class, 'delete'])->name('deleteSection');
    Route::post('/admin/sections', [AdminSectionsController::class, 'store'])->name('admin.sections.create');
    Route::delete('/admin/sections/{id}', [AdminSectionsController::class, 'destroy'])->name('admin.sections.destroy');

    Route::get('/admin/locations/', [LocationsController::class, 'index'])->name('locations');
    Route::post('/admin/locations/search/', [LocationsController::class, 'locationsSearch'])->name('search-locations');
    Route::put('/admin/locations/{id}/', [LocationsController::class, 'update'])->name('saveLocation');
    Route::get('/admin/locations/{id}/', [LocationsController::class, 'delete'])->name('deleteLocation');
    Route::post('/admin/locations', [LocationsController::class, 'store'])->name('admin.locations.create');
    Route::delete('/admin/locations/{id}', [LocationsController::class, 'destroy'])->name('admin.locations.destroy');

    Route::get('/admin/topics/', [AdminTopicsController::class, 'index'])->name('topics');
    Route::post('/admin/topics/search/', [AdminTopicsController::class, 'topicsSearch'])->name('search-topics');
    Route::put('/admin/topics/{id}/', [AdminTopicsController::class, 'update'])->name('saveTopic');
    Route::get('/admin/topics/{id}/', [AdminTopicsController::class, 'delete'])->name('deleteTopic');

    Route::get('/admin/logs/', [LogsController::class, 'index'])->name('logs');


    //Route::get('/admin', [AdminLandingController::class, 'index'])->name('dashboard');
    Route::post('/admin/topics', [AdminTopicsController::class, 'store'])->name('admin.topics.create');
    Route::delete('/admin/topics/{id}', [AdminTopicsController::class, 'destroy'])->name('admin.topics.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
