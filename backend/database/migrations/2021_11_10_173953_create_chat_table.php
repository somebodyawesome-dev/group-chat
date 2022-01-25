<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->string('user1')->nullable();
            $table->string('user2')->nullable();
            $table->timestamps();
            $table->foreign('user1')->references('email')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user2')->references('email')->on('users')->onUpdate('cascade')->onDelete('cascade');
     
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chats');
    }
}
