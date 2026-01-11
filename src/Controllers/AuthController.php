<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\UserRepository;
use App\Services\DiscordOAuthService;
use App\Services\JwtService;

final class AuthController
{
    private DiscordOAuthService $discord;
    private UserRepository $users;
    private JwtService $jwt;

    public function __construct()
    {
        $this->discord = new DiscordOAuthService();
        $this->users = new UserRepository();
        $this->jwt = new JwtService();
    }

    /**
     * @return array<string, mixed>
     */
    public function redirect(): array
    {
        $state = bin2hex(random_bytes(16));
        $_SESSION['discord_oauth_state'] = $state;

        return [
            'auth_url' => $this->discord->getAuthUrl($state),
        ];
    }

    /**
     * @return array{status: int, data: array<string, mixed>}|array<string, mixed>
     */
    public function callback(): array
    {
        $code = $_GET['code'] ?? null;
        $state = $_GET['state'] ?? null;
        $expectedState = $_SESSION['discord_oauth_state'] ?? null;

        if (!is_string($code) || !is_string($state) || $expectedState !== $state) {
            return [
                'status' => 400,
                'data' => ['error' => 'Estado invalido.'],
            ];
        }

        $tokenData = $this->discord->exchangeCodeForToken($code);
        if ($tokenData === null || !isset($tokenData['access_token'])) {
            return [
                'status' => 400,
                'data' => ['error' => 'Falha ao obter token do Discord.'],
            ];
        }

        $discordUser = $this->discord->fetchUser((string) $tokenData['access_token']);
        if ($discordUser === null || !isset($discordUser['id'], $discordUser['username'])) {
            return [
                'status' => 400,
                'data' => ['error' => 'Falha ao obter usuario do Discord.'],
            ];
        }

        $avatar = null;
        if (!empty($discordUser['avatar'])) {
            $avatar = sprintf('https://cdn.discordapp.com/avatars/%s/%s.png', $discordUser['id'], $discordUser['avatar']);
        }

        $payload = [
            'discord_id' => (string) $discordUser['id'],
            'username' => (string) $discordUser['username'],
            'avatar' => $avatar,
        ];

        $existing = $this->users->findByDiscordId($payload['discord_id']);
        if ($existing === null) {
            $user = $this->users->createFromDiscord($payload);
        } else {
            $user = $this->users->updateFromDiscord((int) $existing['id'], $payload);
        }

        if ($user === []) {
            return [
                'status' => 500,
                'data' => ['error' => 'Falha ao salvar usuario.'],
            ];
        }

        $token = $this->jwt->createToken([
            'sub' => (int) $user['id'],
            'discord_id' => $user['discord_id'],
            'username' => $user['username'],
        ]);

        unset($_SESSION['discord_oauth_state']);

        return [
            'token' => $token,
            'user' => [
                'id' => (int) $user['id'],
                'discord_id' => $user['discord_id'],
                'username' => $user['username'],
                'avatar' => $user['avatar'],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function me(): array
    {
        $user = $_SERVER['auth_user'] ?? null;
        if (!is_array($user)) {
            return [
                'status' => 401,
                'data' => ['error' => 'Nao autenticado.'],
            ];
        }

        $vip = $this->users->findActiveVip((int) $user['id']);

        return [
            'user' => [
                'id' => (int) $user['id'],
                'username' => $user['username'],
                'avatar' => $user['avatar'],
                'role' => $user['role'],
                'vip_ativo' => $vip['name'] ?? null,
                'expires_at' => $vip['expires_at'] ?? null,
            ],
        ];
    }
}
