<?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
// use Illuminate\Auth\Authenticatable as AuthenticableTrait;

// class Stagiaire extends Model
// {
//     use AuthenticableTrait;

//     protected $fillable = ['CIN', 'nom', 'prenom', 'filiere', 'groupe', 'anneeScolaire', 'email', 'password'];

//     public function demandes(){
//         return $this->hasMany(Demande::class);
//     }
// }



// <?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Contracts\Auth\Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject; // Import the JWTSubject interface

class Stagiaire extends Model implements Authenticatable, JWTSubject // Implement the JWTSubject interface
{
    use AuthenticatableTrait;

    protected $fillable = ['CIN', 'nom', 'prenom', 'filiere', 'groupe', 'anneeScolaire', 'email', 'password'];

    public function demandes(){
        return $this->hasMany(Demande::class);
    }

    // Add these methods required by JWTSubject interface
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}

