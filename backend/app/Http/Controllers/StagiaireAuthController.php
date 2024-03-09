<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\Stagiaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;


use Tymon\JWTAuth\Exceptions\JWTException;

class StagiaireAuthController extends Controller
{
    /**
     * Register a Stagiaire.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'CIN' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:30|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $stagiaire = Stagiaire::create(array_merge(
                $validator->validated(),
                ['password' => bcrypt($request->password)]
            ));

        return response()->json([
            'message' => 'Stagiaire successfully registered',
            'stagiaire' => $stagiaire
        ], 201);
    }


    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        try {
            $token = auth('stg')->attempt($credentials);
            if (!$token) {
                return response()->json(['success' => false, 'error' => 'Some Error Message'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'error' => 'Failed to login, please try again.'], 500);
        }
        return $this->finalResponse($token);
    }


    public function finalResponse($token){
        // Retrieve the authenticated user
        $user = auth('stg')->user();
    
        // Here, you can customize the response according to your requirements
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'stagiaire' => $user,
            'message' => 'Login successful'
        ], 200);
    }

    public function logout(Request $request){
    try {
        auth('stg')->logout();
        return response()->json(['message' => 'Successfully logged out'], 200);
    } catch (JWTException $e) {
        return response()->json(['message' => 'Failed to logout, please try again.'], 500);
    }
}
}

