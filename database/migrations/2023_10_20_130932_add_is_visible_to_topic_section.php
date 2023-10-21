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
        Schema::table('topics', function (Blueprint $table) {
            $table->boolean('visible')->default(true);
        });
        Schema::table('sections', function (Blueprint $table) {
            $table->boolean('visible')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('topics', function (Blueprint $table) {
            $table->dropColumn('visible');
        });
        Schema::table('sections', function (Blueprint $table) {
            $table->dropColumn('visible');
        });
    }
};
