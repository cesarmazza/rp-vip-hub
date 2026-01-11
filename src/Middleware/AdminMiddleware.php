<?php

declare(strict_types=1);

namespace App\Middleware;

final class AdminMiddleware
{
    /**
     * @return array{status: int, data: array<string, mixed>}|array<string, mixed>
     */
    public function handle(callable $next): array
    {
        $user = $_SERVER['auth_user'] ?? null;
        if (!is_array($user) || ($user['role'] ?? null) !== 'admin') {
            return [
                'status' => 403,
                'data' => ['error' => 'Acesso negado.'],
            ];
        }

        return $next();
    }
}
