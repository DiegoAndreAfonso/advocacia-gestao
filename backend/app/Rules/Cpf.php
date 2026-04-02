<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Cpf implements Rule
{
    public function passes($attribute, $value)
    {
        $cpf = preg_replace('/[^0-9]/', '', (string) $value);

        if (strlen($cpf) != 11) return false;

        if (preg_match('/(\d)\1{10}/', $cpf)) return false;

        for ($t = 9; $t < 11; $t++) {
            $sum = 0;
            for ($c = 0; $c < $t; $c++) {
                $sum += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $sum) % 11) % 10;
            if ($cpf[$c] != $d) return false;
        }

        return true;
    }

    public function message()
    {
        return 'O CPF informado é inválido.';
    }
}
