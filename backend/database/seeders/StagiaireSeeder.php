<?php

namespace Database\Seeders;

use App\Models\Stagiaire;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StagiaireSeeder extends Seeder
{
    public function run(){
        Stagiaire::create([
            'CIN' => 'AB123456',
            'nom' => 'Bahri',
            'prenom' => 'Ilhame',
            'filiere' => 'Dev',
            'groupe' => 201,
            'anneeScolaire' => 2024,
        ]);

        Stagiaire::create([
            'CIN' => 'CD789012',
            'nom' => 'Bahri',
            'prenom' => 'Ali',
            'filiere' => 'ID',
            'groupe' => 104,
            'anneeScolaire' => 2024,
        ]);
    }
}
