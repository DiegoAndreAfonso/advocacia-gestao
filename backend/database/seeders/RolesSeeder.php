<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Kra8\Snowflake\Snowflake;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['admin', 'advogado', 'funcionario', 'cliente'];

        foreach ($roles as $name) {
            Role::firstOrCreate(
                ['name' => $name],
                ['guard_name' => 'api']
            );
        }
    }
}
