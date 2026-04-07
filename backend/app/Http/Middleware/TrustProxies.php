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

        // Determine header set constant compatibly across Symfony versions using Reflection
        $ref = new \ReflectionClass(SymfonyRequest::class);

        if ($ref->hasConstant('HEADER_X_FORWARDED_ALL')) {
            $trustedHeaderSet = $ref->getConstant('HEADER_X_FORWARDED_ALL');
        } else {
            $trustedHeaderSet = 0;
            $parts = [
                'HEADER_FORWARDED',
                'HEADER_X_FORWARDED_FOR',
                'HEADER_X_FORWARDED_HOST',
                'HEADER_X_FORWARDED_PROTO',
                'HEADER_X_FORWARDED_PORT',
                'HEADER_X_FORWARDED_PREFIX',
            ];

            foreach ($parts as $constName) {
                if ($ref->hasConstant($constName)) {
                    $trustedHeaderSet |= (int) $ref->getConstant($constName);
                }
            }
        }

        if ($trusted === '*' || $trusted === '') {
            SymfonyRequest::setTrustedProxies([
                '0.0.0.0/0',
                '::/0',
            ], $trustedHeaderSet);
        } else {
            $proxies = array_map('trim', explode(',', $trusted));
            SymfonyRequest::setTrustedProxies($proxies, $trustedHeaderSet);
        }

        return $next($request);
    }
}
