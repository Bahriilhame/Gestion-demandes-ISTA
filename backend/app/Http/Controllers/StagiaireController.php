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
     * Créer un nouveau stagiaire.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Valider les données reçues du formulaire
        $validatedData = $request->validate([
            'CIN' => 'required|string|unique:stagiaires',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'filiere' => 'required|string',
            'groupe' => 'required|integer',
            'anneeScolaire' => 'required|integer',
            'typeDemande' => 'required|string',
        ]);

        // Générez la date de soumission automatiquement
        $dateSoumission = Carbon::now();

        // Créez le stagiaire
        $stagiaire = Stagiaire::create($validatedData);

        // Créez la demande associée au stagiaire avec la date de soumission générée
        $demande = new Demande([
            'dateSoumission' => $dateSoumission,
            'typeDemande' => $validatedData['typeDemande'],
        ]);
        $stagiaire->demandes()->save($demande);

        return response()->json(['message' => 'Stagiaire et demande ajoutés avec succès'], 201);
    }

    /**
     * Mettre à jour un stagiaire.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $stagiaire = Stagiaire::findOrFail($id);

        $request->validate([
            'CIN' => 'string|unique:stagiaires,CIN,'.$stagiaire->id,
            'nom' => 'string',
            'prenom' => 'string',
            'filiere' => 'string',
            'groupe' => 'integer',
            'anneeScolaire' => 'integer',
        ]);

        $stagiaire->update($request->all());
        return response()->json($stagiaire, 200);
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
