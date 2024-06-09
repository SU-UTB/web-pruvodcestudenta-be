<?php

use App\Http\Controllers\Admin\AdminLandingController;
use App\Http\Controllers\Admin\SectionsController;
use App\Http\Controllers\Admin\TopicsController;
use App\Http\Controllers\Admin\LocationsController;
use App\Http\Controllers\Admin\LogsController;
use App\Http\Controllers\Admin\UsersController;
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

Route::middleware('auth')->group(function () {
    Route::get('/admin/', [AdminLandingController::class, 'index'])->name('dashboard');

    Route::get('/admin/sections/', [SectionsController::class, 'index'])->name('sections');
    Route::post('/admin/sections/search/', [SectionsController::class, 'sectionsSearch'])->name('search-sections');
    Route::get('/admin/sections/search/', [SectionsController::class, 'index'])->name('get-search-sections');
    Route::post('/admin/sections/{id}/', [SectionsController::class, 'update'])->name('saveSection');
    Route::post('/admin/sections', [SectionsController::class, 'store'])->name('admin.sections.create');
    Route::delete('/admin/sections/{id}', [SectionsController::class, 'delete'])->name('admin.sections.delete');

    Route::get('/admin/locations/', [LocationsController::class, 'index'])->name('locations');
    Route::post('/admin/locations/search/', [LocationsController::class, 'locationsSearch'])->name('search-locations');
    Route::get('/admin/locations/search/', [LocationsController::class, 'index'])->name('get-search-locations');
    Route::put('/admin/locations/{id}/', [LocationsController::class, 'update'])->name('saveLocation');
    Route::post('/admin/locations', [LocationsController::class, 'store'])->name('admin.locations.create');
    Route::delete('/admin/locations/{id}', [LocationsController::class, 'delete'])->name('admin.locations.delete');

    Route::get('/admin/users/', [UsersController::class, 'index'])->name('users');
    Route::post('/admin/users/search/', [UsersController::class, 'usersSearch'])->name('search-users');
    Route::get('/admin/users/search/', [UsersController::class, 'index'])->name('get-search-users');

    Route::get('/admin/topics/', [TopicsController::class, 'index'])->name('topics');
    Route::post('/admin/topics/search/', [TopicsController::class, 'topicsSearch'])->name('search-topics');
    Route::get('/admin/topics/search/', [TopicsController::class, 'index'])->name('get-search-topics');
    Route::post('/admin/topics/{id}/', [TopicsController::class, 'update'])->name('saveTopic');
    Route::post('/admin/topics', [TopicsController::class, 'store'])->name('admin.topics.create');
    Route::delete('/admin/topics/{id}', [TopicsController::class, 'delete'])->name('admin.topics.delete');

    Route::get('/admin/logs/', [LogsController::class, 'index'])->name('logs');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
