<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DataTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('data_types')->insert([
            'id' => 1,
            'name' => 'Text',
        ]);

        DB::table('data_types')->insert([
            'id' => 2,
            'name' => 'Boolean',
        ]);

        DB::table('data_types')->insert([
            'id' => 3,
            'name' => 'Hidden',
        ]);

        DB::table('data_types')->insert([
            'id' => 4,
            'name' => 'Date',
        ]);

        DB::table('data_types')->insert([
            'id' => 5,
            'name' => 'Select',
        ]);

        DB::table('data_types')->insert([
            'id' => 6,
            'name' => 'Color',
        ]);

        DB::table('data_types')->insert([
            'id' => 7,
            'name' => 'String',
        ]);

        DB::table('data_types')->insert([
            'id' => 8,
            'name' => 'Number',
        ]);
        
        DB::table('data_types')->insert([
            'id' => 9,
            'name' => 'Repeater',
        ]);
        DB::table('data_types')->insert([
            'id' => 10,
            'name' => 'File',
        ]);
    }
}
