<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('sentBy');
            $table->string('message');
            $table->unsignedBigInteger('chat');
            $table->timestamps();
            $table->foreign('chat')->references('id')->on('chats')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('sentBy')->references('email')->on('users')->onUpdate('cascade')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
