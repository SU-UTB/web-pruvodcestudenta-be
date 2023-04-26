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
    Route::put('/admin/sections/{id}', [AdminSectionsController::class, 'update'])->name('admin.sections.update');

    Route::get('/admin/topics', [AdminContentsController::class, 'index'])->name('admin.topics');
    Route::put('/admin/topics/{id}', [AdminContentsController::class, 'update'])->name('admin.topics.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
/* TODO !!!  });*/


Route::resource('pages/landing', LandingController::class);
Route::resource('sections', SectionController::class);
Route::resource('topics', TopicController::class);
Route::resource('locations', LocationController::class);
