<?php

use App\Http\Controllers\StudentParentController;
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
Route::middleware(['auth:sanctum','ability:student,admin,teacher,parent'])->group(static function(){

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

});

Route::middleware(['auth:sanctum','ability:student'])->group( function() {
    
    Route::get('/student', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:sanctum','ability:admin'])->group( function() {

    Route::apiResources([
        'parents' => StudentParentController::class,
    ]);

});

// hna howa kayn dayr had route haka zayd l préfix w f Studentapi dayr '/api/admin'
// Route::middleware(['auth:sanctum','ability:admin'])->prefix('/admin')->group( function() {

//     Route::apiResources([
//         'parents' => StudentParentController::class,
//     ]);

//     Route::get('/', function (Request $request) {
//         return $request->user();
//     });
// });

Route::middleware(['auth:sanctum','ability:teacher'])->group( function() {
    
    Route::get('/teacher', function (Request $request) {
        return $request->user();
    });
});

