<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWidgetTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('widget_types', function (Blueprint $table) {
            $table->increments('id');
            $table->text('label');
            $table->text('name');
            $table->text('usage')->nullable();
            $table->unsignedBigInteger('order');
            $table->foreignId('data_type_id');
            $table->longText('data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('widget_types');
    }
}
