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
        DB::table('repository')->insert([
            'name' => 'Siteplot Repo',
            'personal_access_token' => 'token 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',
            'path' => 'siteplot/Siteplot-Components',
        ]);
    }
}
