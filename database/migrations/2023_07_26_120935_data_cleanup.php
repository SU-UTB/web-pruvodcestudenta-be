<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('topics', function (Blueprint $table) {
            $table->text('title')->default('')->change();
            $table->mediumText('description')->default('')->change();
            $table->text('image')->default('')->change();
            $table->text('link')->default('')->change();
            $table->text('bg_color')->default('')->change();
            $table->renameColumn('bg_color', 'color');
            $table->text('url')->default('')->change();
        });

        Schema::table('sections', function (Blueprint $table) {
            $table->text('title')->default('')->change();
            $table->mediumText('description')->default('')->change();
            $table->dropColumn('image');
            $table->text('link')->default('')->change();
            $table->text('bg_color')->default('')->change();
            $table->renameColumn('bg_color', 'color');
        });

        Schema::rename('search_tags', 'tags');

        Schema::table('tags', function (Blueprint $table) {
            $table->dropForeign('search_tags_section_id_foreign');
            $table->dropColumn('section_id');
            $table->foreignId('topic_id')->constrained();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('topics', function (Blueprint $table) {
            $table->text('title')->change();
            $table->mediumText('description')->change();
            $table->text('image')->change();
            $table->text('link')->change();
            $table->renameColumn('color', 'bg_color');
            $table->text('bg_color')->change();
            $table->text('url')->change();
        });


        Schema::table('sections', function (Blueprint $table) {
            $table->text('title')->change();
            $table->mediumText('description')->change();
            $table->text('image');
            $table->text('link')->change();
            $table->renameColumn('color', 'bg_color');
            $table->text('bg_color')->change();
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->dropForeign('tags_topic_id_foreign');
            $table->dropColumn('topic_id');
            $table->foreignId('section_id')->constrained();
        });
        Schema::rename('tags', 'search_tags');

    }
};
