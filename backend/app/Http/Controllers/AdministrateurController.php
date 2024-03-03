<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Administrateur;

class AdministrateurController extends Controller
{
    public function index(){
        $administrateurs = Administrateur::all();
        return response()->json($administrateurs);
    }
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|unique:administrateurs|max:255',
            'mdp' => 'required|string|min:8',
            'role' => 'required|string|in:directeur,gestionnaire',
        ]);

        $gestionnaire = Administrateur::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'mdp' => bcrypt($request->mdp),
            'role' => $request->role,
        ]);

        return response()->json($gestionnaire, 201);
    }

}
