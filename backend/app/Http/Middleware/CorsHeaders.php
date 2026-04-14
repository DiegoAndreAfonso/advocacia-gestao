<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CorsHeaders
{
    /**
     * @return string[]
     */
    private function allowedOrigins(): array
    {
        $raw = (string) env(
            'FRONTEND_ALLOWED_ORIGINS',
            'http://localhost:3000,http://127.0.0.1:3000,https://*.devtunnels.ms'
        );

        $items = array_map('trim', explode(',', $raw));

        return array_values(array_filter(array_map(function (string $value): string {
            return rtrim($value, '/');
        }, $items)));
    }

    private function isOriginAllowed(string $origin, array $allowed): bool
    {
        $origin = rtrim(trim($origin), '/');
        $originLower = strtolower($origin);

        $parts = parse_url($originLower);
        $host = is_array($parts) ? ($parts['host'] ?? null) : null;
        $port = is_array($parts) ? ($parts['port'] ?? null) : null;
        $hostPort = $host ? ($host . ($port ? ':' . $port : '')) : null;

        foreach ($allowed as $entry) {
            $entry = strtolower(rtrim(trim((string) $entry), '/'));
            if ($entry === '') {
                continue;
            }

            // Full origin match / wildcard (e.g. "https://*.devtunnels.ms")
            if (Str::contains($entry, '://')) {
                if (Str::is($entry, $originLower)) {
                    return true;
                }
                continue;
            }

            // Host (optionally with port) match / wildcard (e.g. "*.devtunnels.ms" or "localhost:3000")
            if ($hostPort && Str::is($entry, $hostPort)) {
                return true;
            }
            if ($host && Str::is($entry, $host)) {
                return true;
            }
        }

        return false;
    }

    public function handle(Request $request, Closure $next)
    {
        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 200);
        } else {
            $response = $next($request);
        }

        $allowed = $this->allowedOrigins();
        $origin = $request->headers->get('Origin');

        if ($origin && $this->isOriginAllowed($origin, $allowed)) {
            $response->headers->set('Access-Control-Allow-Origin', rtrim($origin, '/'));
            $response->headers->set('Vary', 'Origin', false);
        } else {
            $response->headers->set('Access-Control-Allow-Origin', env('APP_URL', 'http://localhost'));
        }

        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, X-CSRF-TOKEN');

        return $response;
    }
}
