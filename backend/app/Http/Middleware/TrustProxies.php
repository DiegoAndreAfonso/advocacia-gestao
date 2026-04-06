<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Request as SymfonyRequest;

class TrustProxies
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $trusted = env('TRUSTED_PROXIES', '*');

        if ($trusted === '*' || $trusted === '') {
            SymfonyRequest::setTrustedProxies([
                '0.0.0.0/0',
                '::/0',
            ], SymfonyRequest::HEADER_X_FORWARDED_ALL);
        } else {
            $proxies = array_map('trim', explode(',', $trusted));
            SymfonyRequest::setTrustedProxies($proxies, SymfonyRequest::HEADER_X_FORWARDED_ALL);
        }

        return $next($request);
    }
}
