<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(){
        Schema::create('administrateurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('mdp');
            $table->enum('role', ['directeur', 'gestionnaire']);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void{
        Schema::dropIfExists('administrateurs');
    }
};
