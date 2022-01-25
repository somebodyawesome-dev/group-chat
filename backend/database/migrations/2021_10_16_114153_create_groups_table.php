<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            
            $table->string('name')->primary();
            $table->string('level');
            $table->foreign('level')->references('name')->on('levels')->onUpdate('cascade')->onDelete('cascade');
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
        // // 1. Drop foreign key constraints
        // $table->dropForeign(['level']);

        // // 2. Drop the column
        // $table->dropColumn('level');
        Schema::dropIfExists('groups');
    }
}
