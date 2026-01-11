<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Database;

final class LogsRepository
{
    /**
     * @param array<string, mixed> $data
     */
    public function create(string $action, ?int $userId, array $data): void
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('INSERT INTO logs (action, user_id, data) VALUES (:action, :user_id, :data)');
        $stmt->execute([
            'action' => $action,
            'user_id' => $userId,
            'data' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function listRecent(int $limit = 50): array
    {
        $pdo = Database::connection();
        $limit = max(1, min($limit, 200));
        $stmt = $pdo->prepare('SELECT id, action, user_id, data, created_at FROM logs ORDER BY id DESC LIMIT :limit');
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        $logs = $stmt->fetchAll();

        return is_array($logs) ? $logs : [];
    }
}
