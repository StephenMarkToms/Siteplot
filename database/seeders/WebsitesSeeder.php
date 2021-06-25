<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebsitesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('websites')->insert([
            'id' => 1,
            'name' => 'Sutura Website',
            'domain' => 'www.suturacreative.com',
            'netlify_build_hook' => 3423,
            'team_id' => 1,
        ]);
    }
}
