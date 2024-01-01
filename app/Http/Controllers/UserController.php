<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return response()->json(['data' => $users]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::where('id', $id)->first();

        if($user) {
            return response()->json(['data' => $user]);
        }

        return response()->json([
            'message' => 'Not found'
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5|max:20',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'image' => 'image|mimes:jpg,png,jpeg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()], 400);
        }

        $user = User::where('id', $id)->first();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->image = $request->hasFile('image') ?
            ImageController::upload($request->image) : null;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User has been updated'
        ]);
    }

    public function delete(string $id) {
        $user = User::where('id', $id)->first();
        User::destroy($id);

        return response()->json([
            'message' => 'User \'' . $user->email . '\' has been deleted'
        ]);
    }

    private function getToken($email, $password) {
        try {
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>$token
                ]);
            }
        } catch (JWTException $e) {
            return response()->json(['response' => 'error', 'message' => 'Token creation failed']);
        }

        return $token;
    }
    public function login(Request $request) {
        $user = User::where('email', $request->email)->get()->first();
        if ($user && Hash::check($request->password, $user->password)) { // The passwords match...
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
            $response = [
                'success'=>true,
                'data'=>['id'=>$user->id,
                    'auth_token'=>$user->auth_token,
                    'name'=>$user->name,
                    'email'=>$user->email
                ]
            ];
        }
        else
            return response()->json(['success'=>false, 'data'=>'Record doesnt exists'], 401);

        return response()->json($response, 201);
    }
    public function register(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5|max:20',
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails())
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ]);

        $payload = [
            'password'=>Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'auth_token'=> ''
        ];

        $user = new User($payload);

        if ($user->save()) {
            $token = self::getToken($request->email, $request->password); // generate user token
            if (!is_string($token))
                return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);

            $user = User::where('email', $request->email)->get()->first();
            $user->auth_token = $token; // update user token
            $user->assignRole('user');

            $response = [
                'success'=>true,
                'data'=>[
                    'name'=>$user->name,
                    'id'=>$user->id,
                    'email'=>$request->email,
                    'auth_token'=>$token
                ]
            ];
        }
        else
            $response = ['success'=>false, 'data'=>'Could not register user'];

        return response()->json($response, 201);
    }
}
