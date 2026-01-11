<?php

declare(strict_types=1);

namespace App\Services;

final class Router
{
    /**
     * @var array<string, array<string, array{handler: callable, middleware: array<int, callable>}>>
     */
    private array $routes = [];

    /**
     * @param array<int, callable> $middleware
     */
    public function get(string $path, callable $handler, array $middleware = []): void
    {
        $this->addRoute('GET', $path, $handler, $middleware);
    }

    /**
     * @param array<int, callable> $middleware
     */
    public function post(string $path, callable $handler, array $middleware = []): void
    {
        $this->addRoute('POST', $path, $handler, $middleware);
    }

    /**
     * @param array<int, callable> $middleware
     */
    public function put(string $path, callable $handler, array $middleware = []): void
    {
        $this->addRoute('PUT', $path, $handler, $middleware);
    }

    /**
     * @param array<int, callable> $middleware
     */
    public function delete(string $path, callable $handler, array $middleware = []): void
    {
        $this->addRoute('DELETE', $path, $handler, $middleware);
    }

    public function dispatch(string $method, string $path): void
    {
        $normalizedPath = rtrim($path, '/') ?: '/';
        $route = $this->routes[$method][$normalizedPath] ?? null;

        if ($route === null) {
            $this->respond(['error' => 'Rota nao encontrada.'], 404);
            return;
        }

        $handler = $route['handler'];
        $middleware = $route['middleware'];

        $pipeline = static fn () => $handler();

        foreach (array_reverse($middleware) as $layer) {
            $next = $pipeline;
            $pipeline = static fn () => $layer($next);
        }

        $response = $pipeline();

        if ($response !== null) {
            $status = is_array($response) && array_key_exists('status', $response)
                ? (int) $response['status']
                : 200;
            $payload = is_array($response) && array_key_exists('data', $response)
                ? $response['data']
                : $response;

            $this->respond($payload, $status);
        }
    }

    /**
     * @param array<int, callable> $middleware
     */
    private function addRoute(string $method, string $path, callable $handler, array $middleware): void
    {
        $normalizedPath = rtrim($path, '/') ?: '/';
        $this->routes[$method][$normalizedPath] = [
            'handler' => $handler,
            'middleware' => $middleware,
        ];
    }

    private function respond(array $payload, int $status): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
