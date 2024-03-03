<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    protected $fillable = ['stagiaire_id', 'dateSoumission', 'typeDemande'];

    public function stagiaire(){
        return $this->belongsTo(Stagiaire::class);
    }
}
