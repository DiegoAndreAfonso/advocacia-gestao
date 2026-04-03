<?php

namespace App\Http\Controllers;

use App\Models\LegalCase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LegalCaseController extends Controller
{
    public function index(Request $request)
    {
        $token = $request->bearerToken() ?? $request->input('api_token');
        $user = $token ? User::where('api_token', $token)->first() : null;
        if (!$user) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        if ($user->role === 'cliente') {
            $cases = LegalCase::where('client_id', $user->id)->orderBy('created_at', 'desc')->get();
        } elseif ($user->role === 'advogado') {
            $cases = LegalCase::where('assigned_lawyer_id', $user->id)->orderBy('created_at', 'desc')->get();
        } else {
            $cases = LegalCase::orderBy('created_at', 'desc')->get();
        }

        return response()->json(['cases' => $cases]);
    }

    public function store(Request $request)
    {
        $token = $request->bearerToken() ?? $request->input('api_token');
        $user = $token ? User::where('api_token', $token)->first() : null;
        if (!$user) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ];

        if ($user->role === 'advogado' && $request->input('client_id')) {
            $rules['client_id'] = 'required|integer|exists:users,id';
        }

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['message' => 'Dados inválidos', 'errors' => $validator->errors()], 422);
        }

        $data = $request->only(['title', 'description', 'client_id', 'assigned_lawyer_id']);

        if ($user->role === 'cliente') {
            $data['client_id'] = $user->id;
        }

        $case = LegalCase::create([
            'client_id' => $data['client_id'] ?? null,
            'assigned_lawyer_id' => $data['assigned_lawyer_id'] ?? null,
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $request->input('status', 'open'),
        ]);

        return response()->json(['message' => 'Caso criado', 'case' => $case], 201);
    }
}
