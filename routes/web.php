<?php

use App\Http\Controllers\Admin\AdminSectionsController;
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
    Route::get('/admin/', [\App\Http\Controllers\Admin\AdminLandingController::class, 'index'])->name('dashboard');
    Route::get('/admin/sections/', [\App\Http\Controllers\Admin\AdminSectionsController::class, 'index'])->name('sections');
    Route::post('/admin/sections/search/', [AdminSectionsController::class, 'sectionsSearch'])->name('search-sections');
    Route::get('/admin/sections/{id}/', [AdminSectionsController::class, 'save'])->name('saveSection');
    Route::get('/admin/sections/{id}/', [AdminSectionsController::class, 'cancel'])->name('deleteSection');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
