<?php

declare(strict_types=1);

namespace App\Services;

final class JwtService
{
    /**
     * @var array{secret: string, issuer: string, audience: string, ttl: int}
     */
    private array $config;

    public function __construct()
    {
        $this->config = require __DIR__ . '/../../config/jwt.php';
    }

    /**
     * @param array<string, mixed> $payload
     */
    public function createToken(array $payload): string
    {
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $issuedAt = time();
        $payload['iat'] = $issuedAt;
        $payload['exp'] = $issuedAt + $this->config['ttl'];
        $payload['iss'] = $this->config['issuer'];
        $payload['aud'] = $this->config['audience'];

        $encodedHeader = $this->base64UrlEncode(json_encode($header, JSON_UNESCAPED_SLASHES));
        $encodedPayload = $this->base64UrlEncode(json_encode($payload, JSON_UNESCAPED_SLASHES));
        $signature = $this->sign($encodedHeader . '.' . $encodedPayload);

        return $encodedHeader . '.' . $encodedPayload . '.' . $signature;
    }

    /**
     * @return array<string, mixed>|null
     */
    public function verify(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$encodedHeader, $encodedPayload, $signature] = $parts;
        $expectedSignature = $this->sign($encodedHeader . '.' . $encodedPayload);

        if (!hash_equals($expectedSignature, $signature)) {
            return null;
        }

        $payload = json_decode($this->base64UrlDecode($encodedPayload), true);
        if (!is_array($payload)) {
            return null;
        }

        $now = time();
        if (($payload['exp'] ?? 0) < $now) {
            return null;
        }

        if (($payload['iss'] ?? '') !== $this->config['issuer']) {
            return null;
        }

        if (($payload['aud'] ?? '') !== $this->config['audience']) {
            return null;
        }

        return $payload;
    }

    private function sign(string $input): string
    {
        return $this->base64UrlEncode(hash_hmac('sha256', $input, $this->config['secret'], true));
    }

    private function base64UrlEncode(string $value): string
    {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }

    private function base64UrlDecode(string $value): string
    {
        $padding = 4 - (strlen($value) % 4);
        if ($padding !== 4) {
            $value .= str_repeat('=', $padding);
        }

        return base64_decode(strtr($value, '-_', '+/')) ?: '';
    }
}
