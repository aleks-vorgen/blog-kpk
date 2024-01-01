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
    Route::get('user/{id}', 'UserController@show');
    Route::put('user/{id}','UserController@update')->middleware(['role:admin']);
    Route::delete('user/{id}', 'UserController@delete')->middleware(['role:admin']);

    //Topic routes
    Route::post('topic', 'TopicController@store')->middleware(['role:admin']);
    Route::put('topic/{id}', 'TopicController@update')->middleware(['role:admin']);
    Route::delete('topic/{id}', 'TopicController@delete')->middleware(['role:admin']);

    //Article routes
    Route::post('article', 'ArticleController@store')->middleware(['role:admin']);
    Route::put('article/{id}', 'ArticleController@update')->middleware(['role:admin']);
    Route::delete('article/{id}', 'ArticleController@delete')->middleware(['role:admin']);
});

Route::group(['middleware' => 'api-header'], function () {
    //Unauthorized routes

    //Image routes
    Route::get('image/{filename}', 'ImageController@download');

    //User routes
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');

    //Topic routes
    Route::get('topic', 'TopicController@index');
    Route::get('topic/{id}', 'TopicController@show');

    //Article routes
    Route::get('article', 'ArticleController@index');
    Route::get('article/{id}', 'ArticleController@show');
});


