<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Support\Facades\Hash;

class UserController extends Controller{

    public function index(){
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:gestionnaire',
        ]);

        $gestionnaire = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);

        return response()->json($gestionnaire, 201);
    }

    public function update(Request $request, $id)
    {
    // Valider les données
    $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,'.$id,
        'password' => 'sometimes|required|string|min:8', // Le mot de passe est facultatif mais nécessaire s'il est fourni
    ]);

    $user = User::findOrFail($id);

    $userData = [
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'email' => $request->email,
    ];

    // Mettre à jour le mot de passe s'il est fourni
    if ($request->has('password')) {
        $userData['password'] = Hash::make($request->password);
    }

    $user->update($userData);

    // Retourner une réponse JSON
    return response()->json($user, 200);
    
    }


    public function destroy($id){
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }

}
