<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN = 'admin';
    case FUNCIONARIO = 'funcionario';
    case CLIENTE = 'cliente';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrador',
            self::FUNCIONARIO => 'Funcionário',
            self::CLIENTE => 'Cliente',
        };
    }
}
