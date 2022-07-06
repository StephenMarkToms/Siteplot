<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RepositorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('repositories')->insert([
            'name' => 'Primary Components',
            'personal_access_token' => 'token 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',
            'path' => 'siteplot/PrimaryComponents',
        ]);
        DB::table('repositories')->insert([
            'name' => 'Secondary Components',
            'personal_access_token' => 'token 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',
            'path' => 'siteplot/SecondaryComponents',
        ]);
    }
}
