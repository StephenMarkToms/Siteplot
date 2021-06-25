<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockEntryWidgetEntryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_entry_widget_entry', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('block_entry_id');
            $table->unsignedBigInteger('widget_entry_id');
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
        Schema::dropIfExists('block_entry_widget_entry');
    }
}
