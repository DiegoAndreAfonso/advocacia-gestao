<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthService implements IAuthService
{
    /**
     *
     *
     * @param array{email:string,password:string,cpf:string} $credentials
     */

    public function login(array $credentials): array
    {
        $identifier = $credentials['identifier'] ?? null;

        if (!$identifier) {
            throw ValidationException::withMessages([
                'login' => 'Informe CPF ou e-mail.',
            ]);
        }

        $field = filter_var($identifier, FILTER_VALIDATE_EMAIL) ? 'email' : 'cpf';

        $user = User::where($field, $identifier)->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'login' => 'Credenciais inválidas.',
            ]);
        }

        if ($user->is_active === false) {
            throw ValidationException::withMessages([
                'login' => 'Usuário inativo.',
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return [
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ],
        ];
    }

    public function logout(): void
    {
        $user = request()->user();
        if (!$user) {
            throw new AuthenticationException('Não autenticado');
        }

        $user->currentAccessToken()->delete();
    }

    /**
     * 
     *
     * @return array{token:string,user:array{id:int,name:string,email:string}}
     */
    public function refresh(): array
    {
        $user = request()->user();

        if (!$user) {
            throw new AuthenticationException('Não autenticado');
        }

        $user->currentAccessToken()->delete();

        $newToken = $user->createToken('api-token')->plainTextToken;

        return [
            'token' => $newToken,
            'user' => $user->only(['id', 'name', 'email']),
        ];
    }
}
