<?php

use App\Http\Controllers\Admin\AdminTopicsController;
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


Route::get('/migrate', function () {
    return response(Artisan::call('migrate'));
});

Route::resource('pages/landing', LandingController::class);
Route::resource('sections', SectionController::class);
Route::resource('topics', TopicController::class);
Route::resource('locations', LocationController::class);


Route::post('external/reservation', [\App\Http\Controllers\ExternalApiController::class, 'postReservationEmail']);
Route::post('external/reservation/paid', [\App\Http\Controllers\ExternalApiController::class, 'postAfterPayEmail']);
Route::post('external/cancel', [\App\Http\Controllers\ExternalApiController::class, 'postCancelEmail']);
Route::post('external/contact', [\App\Http\Controllers\ExternalApiController::class, 'postCreateContact']);
