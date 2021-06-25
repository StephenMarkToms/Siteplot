<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlockTypeWidgetTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('block_type_widget_type')->insert([
            'block_type_id' => 1,
            'widget_type_id' => 1,
        ]);

        DB::table('block_type_widget_type')->insert([
            'block_type_id' => 1,
            'widget_type_id' => 2,
        ]);

        DB::table('block_type_widget_type')->insert([
            'block_type_id' => 1,
            'widget_type_id' => 3,
        ]);

    }
}
