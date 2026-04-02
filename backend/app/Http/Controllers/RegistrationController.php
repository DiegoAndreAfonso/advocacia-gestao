<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->only(['name', 'email', 'cpf', 'password', 'role', 'phone']);

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:users,email',
            'cpf' => 'nullable|string|unique:users,cpf',
            'password' => 'required|string|min:6',
            'role' => 'required|string',
            'phone' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Dados inválidos', 'errors' => $validator->errors()], 422)
                ->header('Access-Control-Allow-Origin', '*');
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'] ?? null,
            'cpf' => isset($data['cpf']) ? preg_replace('/\D/', '', $data['cpf']) : null,
            'password' => $data['password'],
            'role' => $data['role'],
            'phone' => $data['phone'] ?? null,
        ]);

        return response()->json(['message' => 'Usuário criado', 'user' => $user], 201)
            ->header('Access-Control-Allow-Origin', '*');
    }

    public function registerCsv(Request $request)
    {
        if (!$request->hasFile('csv')) {
            return response()->json(['message' => 'Arquivo CSV não enviado'], 400)
                ->header('Access-Control-Allow-Origin', '*');
        }

        $file = $request->file('csv');
        $path = $file->getRealPath();
        $defaultRole = $request->input('default_role', null);

        if (($handle = fopen($path, 'r')) === false) {
            return response()->json(['message' => 'Não foi possível abrir o arquivo'], 500)
                ->header('Access-Control-Allow-Origin', '*');
        }

        $header = null;
        $results = [];
        $row = 0;

        while (($data = fgetcsv($handle, 0, ',')) !== false) {
            $row++;

            // detect header in first row
            if ($row === 1) {
                $possibleHeader = array_map(fn($c) => strtolower(trim((string)$c)), $data);
                if (in_array('name', $possibleHeader) && (in_array('email', $possibleHeader) || in_array('cpf', $possibleHeader))) {
                    $header = $possibleHeader;
                    continue; // skip header line
                }

                // no header - assume order (name, email, cpf, role, password, phone)
                $header = ['name', 'email', 'cpf', 'role', 'password', 'phone'];
            }

            // map row to associative array
            $rowAssoc = [];
            foreach ($header as $i => $col) {
                $rowAssoc[$col] = isset($data[$i]) ? trim((string)$data[$i]) : null;
            }

            $rowEmail = $rowAssoc['email'] ?? '';
            $rowCpf = $rowAssoc['cpf'] ?? '';

            $rowCpfClean = $rowCpf ? preg_replace('/\D/', '', (string)$rowCpf) : '';

            if (empty($rowEmail) && empty($rowCpfClean)) {
                $results[] = ['row' => $row, 'email' => $rowEmail, 'cpf' => $rowCpf, 'status' => 'error', 'message' => 'Email ou CPF ausente'];
                continue;
            }

            if (!empty($rowEmail) && !filter_var($rowEmail, FILTER_VALIDATE_EMAIL)) {
                if (empty($rowCpfClean)) {
                    $results[] = ['row' => $row, 'email' => $rowEmail, 'status' => 'error', 'message' => 'Email inválido'];
                    continue;
                }
            }

            if (!empty($rowCpfClean) && strlen($rowCpfClean) !== 11) {
                if (empty($rowEmail)) {
                    $results[] = ['row' => $row, 'cpf' => $rowCpf, 'status' => 'error', 'message' => 'CPF inválido'];
                    continue;
                }
            }

            if (!empty($rowEmail) && User::where('email', $rowEmail)->exists()) {
                $results[] = ['row' => $row, 'email' => $rowEmail, 'status' => 'skipped', 'message' => 'Email já existe'];
                continue;
            }

            if (!empty($rowCpfClean) && User::where('cpf', $rowCpfClean)->exists()) {
                $results[] = ['row' => $row, 'cpf' => $rowCpf, 'status' => 'skipped', 'message' => 'CPF já existe'];
                continue;
            }

            $roleValue = $rowAssoc['role'] ?? $defaultRole ?? 'cliente';
            $nameValue = $rowAssoc['name'] ?? 'Sem nome';
            $pass = $rowAssoc['password'] ?? null;
            if (!$pass) {
                try {
                    $pass = bin2hex(random_bytes(6));
                } catch (\Exception $e) {
                    $pass = uniqid('pw_', true);
                }
            }

            try {
                $user = User::create([
                    'name' => $nameValue,
                    'email' => $rowEmail ?: null,
                    'cpf' => $rowCpfClean ?: null,
                    'password' => $pass,
                    'role' => $roleValue,
                    'phone' => $rowAssoc['phone'] ?? null,
                ]);
                $results[] = ['row' => $row, 'email' => $rowEmail, 'cpf' => $rowCpf, 'status' => 'created'];
            } catch (\Exception $ex) {
                $results[] = ['row' => $row, 'email' => $rowEmail, 'cpf' => $rowCpf, 'status' => 'error', 'message' => $ex->getMessage()];
            }
        }

        fclose($handle);

        return response()->json(['message' => 'CSV processado', 'results' => $results])
            ->header('Access-Control-Allow-Origin', '*');
    }
}
