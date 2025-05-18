<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeUserIdsToIntegerInReservations extends Migration
{
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('reserved_by_user_id');
            $table->dropColumn('managed_by_user_id');
            $table->dropColumn('restaurant_id');
        });

        Schema::table('reservations', function (Blueprint $table) {
            $table->unsignedBigInteger('reserved_by_user_id')->nullable();
            $table->unsignedBigInteger('managed_by_user_id')->nullable();
            $table->unsignedBigInteger('restaurant_id')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn(['reserved_by_user_id', 'managed_by_user_id', 'restaurant_id']);
        });

        Schema::table('reservations', function (Blueprint $table) {
            $table->uuid('reserved_by_user_id')->nullable();
            $table->uuid('managed_by_user_id')->nullable();
            $table->uuid('restaurant_id')->nullable();
        });
    }
}

