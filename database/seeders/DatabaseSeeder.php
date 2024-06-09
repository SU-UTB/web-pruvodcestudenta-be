<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {


        $path = '/locations.sql';
        DB::unprepared(file_get_contents(__DIR__ .$path));
        $this->command->info('Locations table seeded!');

        $path = '/sections.sql';
        DB::unprepared(file_get_contents(__DIR__ .$path));
        $this->command->info('Sections table seeded!');


        $path = '/topics.sql';
        DB::unprepared(file_get_contents(__DIR__ .$path));
        $this->command->info('Topics table seeded!');

        $this->call([
            PermissionSeeder::class,
        ]);

    }
}
