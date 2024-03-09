<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stagiaire extends Model
{
    protected $fillable = ['CIN', 'nom', 'prenom', 'filiere', 'groupe', 'anneeScolaire', 'email', 'password'];

    public function demandes(){
        return $this->hasMany(Demande::class);
    }
}
