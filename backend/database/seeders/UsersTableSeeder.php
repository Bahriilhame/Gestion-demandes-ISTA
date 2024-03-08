<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'nom' => 'direc',
            'prenom' => 'direc',
            'email' => 'direc@gmail.com',
            'role' => 'directeur',
            'password' => Hash::make('direc@gmail.com'),
        ]);
    
        // Créez un utilisateur gestionnaire
        User::create([
            'nom' => 'gest',
            'prenom' => 'gest',
            'email' => 'gest@gmail.com',
            'role' => 'gestionnaire',
            'password' => Hash::make('gest@gmail.com'),
        ]);
    }
}
