<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Demande;
use App\Models\Stagiaire;

class DemandeController extends Controller
{

    public function update(Request $request, $id)
{
    try {
        // Récupérer les données de la demande depuis le corps de la requête
        $data = $request->only(['filiere', 'groupe', 'anneeScolaire', 'typeDemande']);
    
        // Trouver le stagiaire associé
        $stagiaire = Stagiaire::findOrFail($id);

        // Mettre à jour les champs nécessaires du stagiaire
        $stagiaire->filiere = $data['filiere'];
        $stagiaire->groupe = $data['groupe'];
        $stagiaire->anneeScolaire = $data['anneeScolaire'];
        $stagiaire->save();

        // Créer une nouvelle demande si le type de demande est fourni
        if (isset($data['typeDemande'])) {
            $demande = new Demande([
                'dateSoumission' => now(), // Vous pouvez ajuster selon vos besoins
                'typeDemande' => $data['typeDemande'],
            ]);

            // Sauvegarder la demande pour ce stagiaire
            $stagiaire->demandes()->save($demande);
        }

        // Retourner la demande mise à jour
        return response()->json($demande, 200);
    } catch (\Exception $e) {
        // Gérer les erreurs
        return response()->json(['message' => 'Une erreur s\'est produite. Veuillez réessayer.'], 500);
    }
}

    public function index(){
        $demandes = Demande::with('stagiaire')->get();
        
        return response()->json($demandes, 200);
    }

    public function destroy($id){
        $demande = Demande::where('id', $id)->firstOrFail();
        $demande->delete();
        return response()->json(null, 204);
    }
}
