<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $identifier = (string) ($request->input('identifier') ?? $request->input('email'));
        $password = (string) $request->input('password');

        $request->validate([
            'identifier' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = null;
        // try by email if identifier looks like email
        if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
            $user = User::where('email', $identifier)->first();
        }

        // try by cpf (digits only)
        if (!$user) {
            $cpf = preg_replace('/\D/', '', $identifier);
            if ($cpf) {
                $user = User::where('cpf', $cpf)->first();
            }
        }

        // fallback: try either field
        if (!$user) {
            $user = User::where('email', $identifier)
                ->orWhere('cpf', preg_replace('/\D/', '', $identifier))
                ->first();
        }

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $token = Str::random(80);
        $user->api_token = $token;
        $user->save();

        return response()->json(['message' => 'Autenticado', 'token' => $token, 'user' => $user]);
    }

    public function me(Request $request)
    {
        $token = $request->bearerToken() ?? $request->input('api_token') ?? $request->query('api_token');
        if (!$token) {
            return response()->json(['message' => 'Token ausente'], 401);
        }

        $user = User::where('api_token', $token)->first();
        if (!$user) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        return response()->json(['user' => $user]);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken() ?? $request->input('api_token');
        $user = $token ? User::where('api_token', $token)->first() : null;
        if ($user) {
            $user->api_token = null;
            $user->save();
        }

        return response()->json(['message' => 'Desconectado']);
    }
}
