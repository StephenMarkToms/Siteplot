<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockTypeRepositoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('block_type_repository', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('block_entry_id');
            $table->unsignedBigInteger('repository_id');
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
        Schema::dropIfExists('block_type_repository');
    }
}
