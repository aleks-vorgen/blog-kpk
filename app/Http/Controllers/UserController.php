<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller {
    public function index()
    {
        $users = User::all();
        foreach ($users as $user) {
            $role = User::where('id', $user->id)->first()->getRoleNames()[0];
            $user->role = $role;
        }

        return response()->json(['data' => $users]);
    }


    public function show($id)
    {
        $user = User::where('id', $id)->first();

        if($user) {
            $role = User::where('id', $id)->first()->getRoleNames()[0];
            $user->role = $role;
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
            'name' => 'required|min:4|max:20',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors()], 400);
        }
        $user = User::where('id', $id)->first();
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->hasFile('image')) {
            ImageController::delete($user->image);
            $user->image = ImageController::upload($request->image);
        }
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
            $role = $user->getRoleNames()[0];
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
            $response = [
                'success'=>true,
                'data'=>['id'=>$user->id,
                    'auth_token'=>$user->auth_token,
                    'name'=>$user->name,
                    'email'=>$user->email,
                    'role' => $role
                ]
            ];
        }
        else
            return response()->json(['success'=>false, 'message'=>'Email or password invalid'], 401);

        return response()->json($response);
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
            ], 400);

        $payload = [
            'password'=>Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
            'auth_token'=> ''
        ];

        $user = new User($payload);

        try {
            $user->save();
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
                    'auth_token'=>$token,
                    'role'=>$user->getRoleNames()[0]
                ]
            ];
        } catch (UniqueConstraintViolationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'User with this email already exists']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'could not register user']);
        }

        return response()->json($response, 201);
    }
}
