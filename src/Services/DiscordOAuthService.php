<?php

declare(strict_types=1);

namespace App\Services;

final class DiscordOAuthService
{
    /**
     * @var array{client_id: string, client_secret: string, redirect_uri: string, scopes: array<int, string>}
     */
    private array $config;

    public function __construct()
    {
        $this->config = require __DIR__ . '/../../config/discord.php';
    }

    public function getAuthUrl(string $state): string
    {
        $query = http_build_query([
            'client_id' => $this->config['client_id'],
            'redirect_uri' => $this->config['redirect_uri'],
            'response_type' => 'code',
            'scope' => implode(' ', $this->config['scopes']),
            'state' => $state,
            'prompt' => 'consent',
        ]);

        return 'https://discord.com/api/oauth2/authorize?' . $query;
    }

    /**
     * @return array<string, mixed>|null
     */
    public function exchangeCodeForToken(string $code): ?array
    {
        $payload = http_build_query([
            'client_id' => $this->config['client_id'],
            'client_secret' => $this->config['client_secret'],
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => $this->config['redirect_uri'],
        ]);

        $response = $this->request('POST', 'https://discord.com/api/oauth2/token', [
            'Content-Type: application/x-www-form-urlencoded',
        ], $payload);

        return is_array($response) ? $response : null;
    }

    /**
     * @return array<string, mixed>|null
     */
    public function fetchUser(string $accessToken): ?array
    {
        $response = $this->request('GET', 'https://discord.com/api/users/@me', [
            'Authorization: Bearer ' . $accessToken,
        ]);

        return is_array($response) ? $response : null;
    }

    /**
     * @param array<int, string> $headers
     * @return array<string, mixed>|null
     */
    private function request(string $method, string $url, array $headers = [], ?string $body = null): ?array
    {
        $handle = curl_init($url);
        if ($handle === false) {
            return null;
        }

        $options = [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
        ];

        if ($body !== null) {
            $options[CURLOPT_POSTFIELDS] = $body;
        }

        curl_setopt_array($handle, $options);
        $result = curl_exec($handle);
        $status = curl_getinfo($handle, CURLINFO_HTTP_CODE);
        curl_close($handle);

        if ($result === false || $status < 200 || $status >= 300) {
            return null;
        }

        $decoded = json_decode($result, true);

        return is_array($decoded) ? $decoded : null;
    }
}
