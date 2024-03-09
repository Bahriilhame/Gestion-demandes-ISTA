<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Demande;
use App\Models\Stagiaire;
use Illuminate\Http\Request;

class StagiaireController extends Controller{
    /**
     * Afficher la liste des stagiaires.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $stagiaires = Stagiaire::all();
        $stagiaires = Stagiaire::with('demandes')->get();
        return response()->json($stagiaires);
    }

    /**
     * Afficher les détails d'un stagiaire.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $stagiaire = Stagiaire::findOrFail($id);
        return response()->json($stagiaire);
    }

    /**
     * Supprimer un stagiaire.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($CIN){
        $stagiaire = Stagiaire::where('CIN', $CIN)->firstOrFail();
        $stagiaire->delete();
        return response()->json(null, 204);
    }
}