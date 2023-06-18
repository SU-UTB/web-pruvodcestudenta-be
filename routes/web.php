<?php

use App\Http\Controllers\Admin\AdminLandingController;
use App\Http\Controllers\Admin\AdminSectionsController;
use App\Http\Controllers\Admin\AdminTopicsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/admin/migrate', function () {
    //$exitCode = Artisan::call('migrate:fresh --seed --force');
    $exitCode = Artisan::call('migrate');
    return $exitCode;
});

Route::middleware('auth')->group(function () {
    Route::get('/admin/', [AdminLandingController::class, 'index'])->name('dashboard');

    Route::get('/admin/sections/', [AdminSectionsController::class, 'index'])->name('sections');
    Route::post('/admin/sections/search/', [AdminSectionsController::class, 'sectionsSearch'])->name('search-sections');
    Route::put('/admin/sections/{id}/', [AdminSectionsController::class, 'update'])->name('saveSection');
    Route::get('/admin/sections/{id}/', [AdminSectionsController::class, 'cancel'])->name('deleteSection');

    Route::get('/admin/topics/', [AdminTopicsController::class, 'index'])->name('topics');
    Route::post('/admin/topics/search/', [AdminTopicsController::class, 'topicsSearch'])->name('search-topics');
    Route::put('/admin/topics/{id}/', [AdminTopicsController::class, 'update'])->name('saveTopic');
    Route::get('/admin/topics/{id}/', [AdminTopicsController::class, 'cancel'])->name('deleteTopic');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/admin', [AdminLandingController::class, 'index'])->name('dashboard');

    Route::post('/admin/sections', [AdminSectionsController::class, 'store'])->name('admin.sections.create');
    Route::delete('/admin/sections/{id}', [AdminSectionsController::class, 'destroy'])->name('admin.sections.destroy');
/*
    //TODO Topics view
    Route::get('/admin/topics', [AdminTopicsController::class, 'index'])->name('admin.topics');
    Route::post('/admin/topics', [AdminTopicsController::class, 'store'])->name('admin.topics.create');
    Route::put('/admin/topics/{id}', [AdminTopicsController::class, 'update'])->name('admin.topics.update');
    Route::delete('/admin/topics/{id}', [AdminTopicsController::class, 'destroy'])->name('admin.topics.destroy');*/


});


require __DIR__ . '/auth.php';
