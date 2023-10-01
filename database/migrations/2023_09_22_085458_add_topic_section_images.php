<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('section_images', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->foreignId('section_id')->constrained();
        });

        Schema::create('topic_images', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->foreignId('topic_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('section_images');
        Schema::drop('topic_images');
    }
};
