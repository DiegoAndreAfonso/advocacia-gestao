<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class TranslationController extends Controller
{
    private function cacheKey(string $text, string $target): string
    {
        return 'tr:v1:' . $target . ':' . sha1($text);
    }

    /**
     * POST /api/translate
     *
     * Body:
     * - target: pt|en|es
     * - texts: string[]
     */
    public function translate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'target' => ['required', 'string', 'in:pt,en,es'],
            'texts' => ['required', 'array', 'min:1', 'max:80'],
            'texts.*' => ['string', 'max:1000'],
        ]);

        $target = $validated['target'];
        $texts = array_values(array_filter(array_map(fn ($t) => trim((string) $t), $validated['texts']), fn ($t) => $t !== ''));

        if ($target === 'pt') {
            $translations = [];
            foreach ($texts as $t) $translations[$t] = $t;

            return ResponseService::success(['translations' => $translations]);
        }

        $endpoint = config('services.translate.url') ?: env('TRANSLATION_API_URL', 'https://libretranslate.com/translate');
        $apiKey = config('services.translate.key') ?: env('TRANSLATION_API_KEY');

        $translations = [];
        $missing = [];

        foreach ($texts as $text) {
            $cached = Cache::get($this->cacheKey($text, $target));
            if (is_string($cached) && $cached !== '') {
                $translations[$text] = $cached;
            } else {
                $missing[] = $text;
            }
        }

        if (count($missing) > 0) {
            // Parallelize upstream calls so we don't block the UI for many strings.
            $responses = Http::pool(function ($pool) use ($missing, $endpoint, $apiKey, $target) {
                return array_map(function ($text) use ($pool, $endpoint, $apiKey, $target) {
                    $payload = [
                        'q' => $text,
                        'source' => 'pt',
                        'target' => $target,
                        'format' => 'text',
                    ];

                    if (is_string($apiKey) && $apiKey !== '') {
                        $payload['api_key'] = $apiKey;
                    }

                    return $pool
                        ->connectTimeout(3)
                        ->timeout(8)
                        ->acceptJson()
                        ->asJson()
                        ->post($endpoint, $payload);
                }, $missing);
            });

            foreach ($missing as $i => $text) {
                try {
                    $response = $responses[$i] ?? null;
                    if (! $response || ! $response->ok()) {
                        $translations[$text] = $text;
                        continue;
                    }

                    $body = $response->json();
                    $translated = is_array($body) && isset($body['translatedText']) ? (string) $body['translatedText'] : $text;
                    $translations[$text] = $translated;
                    Cache::put($this->cacheKey($text, $target), $translated, now()->addDays(30));
                } catch (\Throwable $e) {
                    $translations[$text] = $text;
                }
            }
        }

        return ResponseService::success(['translations' => $translations]);
    }
}
