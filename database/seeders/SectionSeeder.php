<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sections')->insert([
            'title' => "Praktické rady",
            'description' => "Něco random o tom jaké systémy, věci, lifehacky na univerzitě provozujeme, něco jakoby možná vlastně smysluplného a zajímavého co tu nebude 2x nakopírované aby to bylo dost dlouhé."
            , 'image' => "",
            "link" => 'prakticke-rady',
            "bg_color" => "#FDA6A4"
        ]);
        DB::table('sections')->insert([
            'title' => "Fakulty",
            'description' => "Něco random o tom jaké m8 univeryita fakulty, ústavy, oddělení (Jobko, atd...), něco jakoby možná vlastně smysluplného a zajímavého co tu nebude 2x nakopírované aby to bylo dost dlouhé."
            , 'image' => "",
            "link" => 'faculties',
            "bg_color" => "#FDA6A4"
        ]);
        DB::table('sections')->insert([
            'title' => "Studentské organizace",
            'description' => "Něco random o tom jaké studentské organizace pod UTB fungují, kooperují, něco jakoby možná vlastně smysluplného a zajímavého co tu nebude 2x nakopírované aby to bylo dost dlouhé."
            , 'image' => "",
            "link" => 'studentske-organizace',
            "bg_color" => "#FDA6A4"
        ]);
    }
}
