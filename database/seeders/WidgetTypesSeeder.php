<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WidgetTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('widget_types')->insert([
            'id' => 1,
            'data_type_id' => 2,
            'label' => 'Hide',
            'name' => 'hidden',
            'order' => 0,
        ]);

        DB::table('widget_types')->insert([
            'id' => 2,
            'data_type_id' => 1,
            'label' => 'Title',
            'name' => 'title',
            'order' => 1,
        ]);

        DB::table('widget_types')->insert([
            'id' => 3,
            'data_type_id' => 6,
            'label' => 'Background Color',
            'name' => 'background_color',
            'usage' => 'style',
            'order' => 0,
        ]);

    }
}
