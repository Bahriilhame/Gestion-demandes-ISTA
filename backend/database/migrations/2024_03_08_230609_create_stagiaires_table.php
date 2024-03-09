<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(){
        Schema::create('stagiaires', function (Blueprint $table) {
            $table->id();
            $table->string('CIN')->unique();
            $table->string('nom');
            $table->string('prenom');
            $table->string('filiere');
            // $table->string('filiere')->nullable()->change();

            $table->integer('groupe');
            $table->integer('anneeScolaire');

            $table->string('email')->unique(); // Ajout du champ email
            $table->timestamp('email_verified_at')->nullable();
            
            $table->string('password'); // Ajout du champ password
            
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stagiaires');
    }
};
