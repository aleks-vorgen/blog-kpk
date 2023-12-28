<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coment', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('text');
            $table->boolean('delete');

            $table->bigInteger('coment_id');
            $table->bigInteger('user_id');
            $table->bigInteger('article_id');

            $table->foreign('coment_id')->references('id')->on('coment');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('article_id')->references('id')->on('article');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coment');
    }
};
