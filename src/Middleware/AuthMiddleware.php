<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Models\UserRepository;
use App\Services\JwtService;

final class AuthMiddleware
{
    private JwtService $jwtService;
    private UserRepository $users;

    public function __construct()
    {
        $this->jwtService = new JwtService();
        $this->users = new UserRepository();
    }

    /**
     * @return array{status: int, data: array<string, mixed>}|array<string, mixed>
     */
    public function handle(callable $next): array
    {
        $token = $this->extractToken();
        if ($token === null) {
            return [
                'status' => 401,
                'data' => ['error' => 'Token ausente.'],
            ];
        }

        $payload = $this->jwtService->verify($token);
        if ($payload === null) {
            return [
                'status' => 401,
                'data' => ['error' => 'Token invalido.'],
            ];
        }

        $userId = (int) ($payload['sub'] ?? 0);
        if ($userId === 0) {
            return [
                'status' => 401,
                'data' => ['error' => 'Token invalido.'],
            ];
        }

        $user = $this->users->findById($userId);
        if ($user === null) {
            return [
                'status' => 401,
                'data' => ['error' => 'Usuario nao encontrado.'],
            ];
        }

        $_SERVER['auth_user'] = $user;

        return $next();
    }

    private function extractToken(): ?string
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? null;

        if ($header === null && function_exists('getallheaders')) {
            $headers = getallheaders();
            if (is_array($headers) && isset($headers['Authorization'])) {
                $header = $headers['Authorization'];
            }
        }

        if ($header === null) {
            return null;
        }

        if (preg_match('/Bearer\s+(\S+)/', $header, $matches) === 1) {
            return $matches[1];
        }

        return null;
    }
}
