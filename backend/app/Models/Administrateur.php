<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrateur extends Model
{
    protected $guard = 'admin';

    protected $fillable = ['nom', 'prenom', 'email', 'mdp', 'role'];

    protected $hidden = ['mdp', 'remember_token'];

}
