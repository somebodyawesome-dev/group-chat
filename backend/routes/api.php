<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PusherAuth;
use App\Http\Controllers\UserController;

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



  
  // Unprotected routes
Route::group(['middleware' => ['cors']], function () {
 
  
  Route::post('/login',[AuthController::class,'login']);
    //under develpoment
  Route::get('/activate/{token}',[AuthController::class,'activation']);
  Route::post('/resetRequest',[AuthController::class,'resetRequest']);
  Route::post('/reset/{token}',[AuthController::class,'reset']);
});

// Protected routes
Route::group(['middleware' => ['cors','auth:sanctum']], function () {
  //admin routes
  Route::middleware('isAdmin')->group(function(){
    Route::post('/register',[AuthController::class,'register']);
    Route::resource('groups',GroupController::class);
    Route::resource('users',UserController::class);
    Route::resource('levels',LevelController::class);
    Route::get('/users/search/{email}',[UserController::class,'search']);

  });
  Route::get('/levels/search/{name}',[LevelController::class,'search']);
  
  Route::post('/role',[AuthController::class,'role']);


  Route::get('/group/users',[GroupController::class,'getUsersByGroup']);
  Route::resource('messages',MessageController::class);
  Route::get('/message/{email}',[MessageController::class,'getMessagesFromChat']);
  Route::post('/pusher-auth',[PusherAuth::class,'pusherAuth']);

  Route::post('/logout',[AuthController::class,'logout']);
});
