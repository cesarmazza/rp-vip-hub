<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Database;

final class UserRepository
{
    /**
     * @return array<string, mixed>|null
     */
    public function findByDiscordId(string $discordId): ?array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('SELECT * FROM users WHERE discord_id = :discord_id LIMIT 1');
        $stmt->execute(['discord_id' => $discordId]);
        $user = $stmt->fetch();

        return is_array($user) ? $user : null;
    }

    /**
     * @return array<string, mixed>|null
     */
    public function findById(int $id): ?array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('SELECT * FROM users WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch();

        return is_array($user) ? $user : null;
    }

    /**
     * @param array{discord_id: string, username: string, avatar: ?string} $discordUser
     * @return array<string, mixed>
     */
    public function createFromDiscord(array $discordUser): array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('INSERT INTO users (discord_id, username, avatar, role) VALUES (:discord_id, :username, :avatar, :role)');
        $stmt->execute([
            'discord_id' => $discordUser['discord_id'],
            'username' => $discordUser['username'],
            'avatar' => $discordUser['avatar'],
            'role' => 'user',
        ]);

        $id = (int) $pdo->lastInsertId();

        return $this->findById($id) ?? [];
    }

    /**
     * @param array{discord_id: string, username: string, avatar: ?string} $discordUser
     * @return array<string, mixed>
     */
    public function updateFromDiscord(int $id, array $discordUser): array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('UPDATE users SET username = :username, avatar = :avatar WHERE id = :id');
        $stmt->execute([
            'username' => $discordUser['username'],
            'avatar' => $discordUser['avatar'],
            'id' => $id,
        ]);

        return $this->findById($id) ?? [];
    }

    /**
     * @return array{name: string, expires_at: string}|null
     */
    public function findActiveVip(int $userId): ?array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'SELECT vip_plans.name, user_vips.expires_at '
            . 'FROM user_vips '
            . 'INNER JOIN vip_plans ON vip_plans.id = user_vips.vip_plan_id '
            . 'WHERE user_vips.user_id = :user_id '
            . 'AND user_vips.status = :status '
            . 'AND user_vips.expires_at > NOW() '
            . 'ORDER BY user_vips.expires_at DESC '
            . 'LIMIT 1'
        );
        $stmt->execute([
            'user_id' => $userId,
            'status' => 'active',
        ]);
        $vip = $stmt->fetch();

        return is_array($vip) ? $vip : null;
    }
}
