<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('phone');
            }

            if (! Schema::hasColumn('users', 'oab_number')) {
                $table->string('oab_number')->nullable()->after('is_active');
            }

            if (! Schema::hasColumn('users', 'areas')) {
                $table->text('areas')->nullable()->after('oab_number');
            }

            if (! Schema::hasColumn('users', 'position')) {
                $table->string('position')->nullable()->after('areas');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $columns = [];
            foreach (['is_active', 'oab_number', 'areas', 'position'] as $col) {
                if (Schema::hasColumn('users', $col)) {
                    $columns[] = $col;
                }
            }

            if (! empty($columns)) {
                $table->dropColumn($columns);
            }
        });
    }
};

