<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stagiaire;
use Validator;

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
}

