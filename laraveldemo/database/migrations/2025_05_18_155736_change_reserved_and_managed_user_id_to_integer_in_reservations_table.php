<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeReservedAndManagedUserIdToIntegerInReservationsTable extends Migration
{
    public function up()
    {
        Schema::table('reservations', function (Blueprint $table) {
            // لو الأعمدة موجودة كـ UUID، غيرها إلى unsignedBigInteger (أو integer لو كنت تستخدم integer أصغر)
            $table->unsignedBigInteger('reserved_by_user_id')->change();
            $table->unsignedBigInteger('managed_by_user_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('reservations', function (Blueprint $table) {
            // لو حبيت ترجعها لـ uuid
            $table->uuid('reserved_by_user_id')->change();
            $table->uuid('managed_by_user_id')->nullable()->change();
        });
    }
}
