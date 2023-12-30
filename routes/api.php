<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth','api-header']], function () {
    //Authorized routes

    //User routes
    Route::get('user', 'UserController@index');
    Route::get('user/{user}', 'UserController@show');
    Route::put('user/{user}','UserController@update')->middleware(['role:admin']);
    Route::delete('user/{user}', 'UserController@delete')->middleware(['role:admin']);

    //Topic routes
    Route::post('topic', 'TopicController@store')->middleware(['role:admin']);
    Route::put('topic/{topic}', 'TopicController@update')->middleware(['role:admin']);
    Route::delete('topic/{topic}', 'TopicController@delete')->middleware(['role:admin']);
});

Route::group(['middleware' => 'api-header'], function () {
    //Unauthorized routes

    //User routes
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');

    //Topic routes
    Route::get('topic', 'TopicController@index');
    Route::get('topic/{topic}', 'TopicController@show');
});


