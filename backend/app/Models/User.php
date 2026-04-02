<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Traits\HasSnowflakeId;

/**
 * @method \Laravel\Sanctum\NewAccessToken createToken(string $name, array $abilities = ['*'])
 * @method \Laravel\Sanctum\PersonalAccessToken|null currentAccessToken()
 * @method \Illuminate\Support\Collection getRoleNames()
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasRoles, HasFactory, Notifiable, HasSnowflakeId;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $guard_name = 'api';
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'cpf',
        'password',
        'api_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'api_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getRoleEnumAttribute(): ?RoleEnum
    {
        $roleName = $this->getRoleNames()->first();

        return match ($roleName) {
            'admin' => RoleEnum::ADMIN,
            'funcionario' => RoleEnum::FUNCIONARIO,
            'cliente' => RoleEnum::CLIENTE,

            default => null,
        };
    }

    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }
    public function isFuncionario(): bool
    {
        return $this->hasRole('funcionario');
    }
    public function isCliente(): bool
    {
        return $this->hasRole('cliente');
    }
}
