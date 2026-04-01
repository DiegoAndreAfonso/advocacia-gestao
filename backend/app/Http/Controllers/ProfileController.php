<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $token = $request->bearerToken() ?? $request->input('api_token') ?? $request->query('api_token');
        if (!$token) {
            return response()->json(['message' => 'Token ausente'], 401)->header('Access-Control-Allow-Origin', '*');
        }

        $user = User::where('api_token', $token)->first();
        if (!$user) {
            return response()->json(['message' => 'Token inválido'], 401)->header('Access-Control-Allow-Origin', '*');
        }

        return response()->json(['user' => $user])->header('Access-Control-Allow-Origin', '*');
    }

    public function update(Request $request)
    {
        $token = $request->bearerToken() ?? $request->input('api_token');
        $user = $token ? User::where('api_token', $token)->first() : null;
        if (!$user) {
            return response()->json(['message' => 'Token inválido'], 401)->header('Access-Control-Allow-Origin', '*');
        }

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'cpf' => 'nullable|string|unique:users,cpf,' . $user->id,
            'phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
        ];

        if ($user->role === 'advogado') {
            $rules['oab_number'] = 'nullable|string|max:100';
            $rules['areas'] = 'nullable|string';
            $rules['position'] = 'nullable|string|max:100';
        } elseif ($user->role === 'funcionario') {
            $rules['position'] = 'nullable|string|max:100';
        }

        $data = $request->only(array_keys($rules));
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            return response()->json(['message' => 'Dados inválidos', 'errors' => $validator->errors()], 422)
                ->header('Access-Control-Allow-Origin', '*');
        }

        if (isset($data['cpf'])) {
            $data['cpf'] = preg_replace('/\D/', '', $data['cpf']);
        }

        $user->fill($data);
        $user->save();

        return response()->json(['message' => 'Perfil atualizado', 'user' => $user])
            ->header('Access-Control-Allow-Origin', '*');
    }
}
