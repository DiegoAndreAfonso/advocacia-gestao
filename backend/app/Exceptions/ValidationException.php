<?php

namespace App\Exceptions;

use Exception;

class ValidationException extends Exception
{
    //
    $identifier = $this->input('identifier');

    $isEmail = filter_var($identifier, FILTER_VALIDATE_EMAIL);
    $isCpf = preg_match('/^\d{11}$/', preg_replace('/\D/', '', $identifier));

    if (!$isEmail && !$isCpf) {
        throw ValidationException::withMessages([
            'identifier' => 'Informe um CPF ou email válido.',
        ]);
    }
}
