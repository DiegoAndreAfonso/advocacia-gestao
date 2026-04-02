<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserExtraFields extends Migration
{
    /*
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('oab_number')->nullable()->after('api_token');
            $table->text('areas')->nullable()->after('oab_number');
            $table->string('position')->nullable()->after('areas');
            $table->string('location')->nullable()->after('position');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['oab_number', 'areas', 'position', 'location']);
        });
    }
        */
}
