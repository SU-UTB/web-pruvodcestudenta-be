<?php


use App\Http\Controllers\TopicController;
use App\Http\Controllers\LandingController;
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
    return response(Artisan::call('migrate', [
        '--force' => true
    ]));
});

Route::get('/schedule-work', function () {
    return response(Artisan::call('schedule:work', [
        '--force' => true
    ]));
});

Route::get('/schedule-run', function () {
    return response(Artisan::call('schedule:run', [
        '--force' => true
    ]));
});
Route::get('/doc', function () {
    return response()->file(storage_path('api-docs/api-docs.json'));
});

Route::get('pages/landing', [LandingController::class, 'index']);
Route::post('pages/landing/search', [LandingController::class, 'search']);
Route::get('pages/sections/{id}', [SectionController::class, 'show']);
Route::get('pages/topics/{id}', [TopicController::class, 'show']);
