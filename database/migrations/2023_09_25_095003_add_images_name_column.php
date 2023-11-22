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
        Schema::table('section_images', function (Blueprint $table) {
            $table->text('name');
        });
        Schema::table('topic_images', function (Blueprint $table) {
            $table->text('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('section_images', function (Blueprint $table) {
            $table->dropColumn('name');
        });
        Schema::table('topic_images', function (Blueprint $table) {
            $table->dropColumn('name');
        });
    }
};
