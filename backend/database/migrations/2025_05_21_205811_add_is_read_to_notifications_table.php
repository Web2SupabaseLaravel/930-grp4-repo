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
        // is_read
        $table->boolean('is_read')->default(false); //  default value false
    });
}

public function down()
{
    Schema::table('notifications', function (Blueprint $table) {
        //drop or remove  is_read 
        $table->dropColumn('is_read');
    });
}
};
