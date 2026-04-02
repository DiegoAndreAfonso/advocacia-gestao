<?php

namespace App\Exceptions;

use App\Services\ResponseService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Throwable;

class Handler extends ExceptionHandler
{
    public function register(): void
    {
        $this->renderable(function (ValidationException $e, Request $request) {
            if (!$request->is('api/*')) return;

            return ResponseService::exception(
                $e,
                Response::HTTP_UNPROCESSABLE_ENTITY,
                $e->getMessage(),
                $e->errors()
            );
        });

        $this->renderable(function (DomainException $e, Request $request) {
            if (!$request->is('api/*')) return;

            if ($e->isError()) {
                return ResponseService::exception(
                    $e,
                    $e->getCode(),
                    $e->getMessage()
                );
            }

            return ResponseService::success(
                [],
                $e->getMessage(),
                $e->getCode()
            );
        });

    }

    public function render($request, Throwable $e): Response|JsonResponse
    {
        if ($request->is('api/*')) {

            // ✅ NÃO AUTENTICADO (401)
            if ($e instanceof AuthenticationException) {
                return ResponseService::exception(
                    $e,
                    Response::HTTP_UNAUTHORIZED,
                    'Não autenticado.'
                );
            }

            // ✅ NÃO AUTORIZADO (403)
            if ($e instanceof AuthorizationException) {
                return ResponseService::exception(
                    $e,
                    Response::HTTP_FORBIDDEN,
                    'Ação não autorizada.'
                );
            }

            // ✅ MODEL NÃO ENCONTRADO (404)
            if ($e instanceof ModelNotFoundException) {
                $modelName = class_basename($e->getModel());

                return response()->json([
                    'success' => false,
                    'message' => "Recurso {$modelName} não encontrado.",
                    'code' => Response::HTTP_NOT_FOUND,
                ], Response::HTTP_NOT_FOUND);
            }

            // ✅ ERRO GENÉRICO (500)
            return ResponseService::exception(
                $e,
                Response::HTTP_INTERNAL_SERVER_ERROR,
                $e->getMessage() ?: 'Erro interno do servidor.'
            );
        }

        return parent::render($request, $e);
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return ResponseService::exception(
            $exception,
            Response::HTTP_UNAUTHORIZED,
            'Não autenticado.'
        );
    }
}