<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('notifications', function (Blueprint $table) {
        //add created_at and updated_at
        $table->timestamps(); 
    });
}

public function down()
{
    Schema::table('notifications', function (Blueprint $table) {
        //  rempve created_at and updated_at  
        $table->dropColumn('created_at');
        $table->dropColumn('updated_at');
    });
}

};
