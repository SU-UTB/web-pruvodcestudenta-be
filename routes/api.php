<?php

use App\Http\Controllers\Admin\AdminContentsController;
use App\Http\Controllers\Admin\AdminLandingController;
use App\Http\Controllers\Admin\AdminSectionsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\SectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


/* TODO !!! Route::middleware('auth')->group(function () {*/
Route::get('/admin', [AdminLandingController::class, 'index'])->name('dashboard');

Route::get('/admin/sections', [AdminSectionsController::class, 'index'])->name('admin.sections');
Route::post('/admin/sections', [AdminSectionsController::class, 'store'])->name('admin.sections.create');
Route::put('/admin/sections/{id}', [AdminSectionsController::class, 'update'])->name('admin.sections.update');
Route::delete('/admin/sections/{id}', [AdminSectionsController::class, 'destroy'])->name('admin.sections.destroy');

//TODO Topics view
Route::get('/admin/topics', [AdminContentsController::class, 'index'])->name('admin.topics');
Route::post('/admin/topics', [AdminContentsController::class, 'store'])->name('admin.topics.create');
Route::put('/admin/topics/{id}', [AdminContentsController::class, 'update'])->name('admin.topics.update');
Route::delete('/admin/topics/{id}', [AdminContentsController::class, 'destroy'])->name('admin.topics.destroy');

Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
/* TODO !!!  });*/

Route::get('/migrate', function () {
    return response(Artisan::call('migrate'));
});

Route::resource('pages/landing', LandingController::class);
Route::resource('sections', SectionController::class);
Route::resource('topics', TopicController::class);
Route::resource('locations', LocationController::class);
