<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Kra8\Snowflake\Snowflake;
use App\Enums\RoleEnum;

class TestUsersSeeder extends Seeder
{
    public function run(): void
    {
        $snowflake = app(Snowflake::class);

        $admin = User::updateOrCreate(
            ['email' => 'teste@email.com'],
            [
                'id' => $snowflake->next(),
                'name' => 'Administrador Teste',
                'password' => Hash::make('123456'),
                'cpf' => '12345678909',
            ]
        );

        $admin->syncRoles([RoleEnum::ADMIN->value]);

        $funcionario = User::updateOrCreate(
            ['email' => 'funcionario@example.com'],
            [
                'id' => $snowflake->next(),
                'name' => 'Funcionário Teste',
                'password' => Hash::make('123456'),
                'cpf' => '12345678907',

            ]
        );

        $funcionario->syncRoles([RoleEnum::FUNCIONARIO->value]);

        $cliente = User::updateOrCreate(
            ['email' => 'cliente@example.com'],
            [
                'id' => $snowflake->next(),
                'name' => 'cliente Teste',
                'password' => Hash::make('123456'),
                'cpf' => '12345678908',

            ]
        );

        $cliente->syncRoles([RoleEnum::CLIENTE->value]);
    }
}
