<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlockTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('block_types')->insert([
            'id' => 1,
            'team_id' => 1,
            'name' => 'Header',
            'file_name' => 'testBlock.vue',
            'component' => '',
            'created_at' => '2022-01-01 00:00:00',
            'updated_at' => '2022-01-01 00:00:00',
        ]);
    }
}
