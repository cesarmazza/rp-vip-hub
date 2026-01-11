<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Database;

final class MetricsRepository
{
    public function getMonthlyRevenue(): float
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'SELECT COALESCE(SUM(amount), 0) AS total '
            . 'FROM payments '
            . 'WHERE status = :status '
            . 'AND YEAR(created_at) = YEAR(CURRENT_DATE()) '
            . 'AND MONTH(created_at) = MONTH(CURRENT_DATE())'
        );
        $stmt->execute(['status' => 'paid']);
        $result = $stmt->fetch();

        return (float) ($result['total'] ?? 0);
    }

    public function getActiveVipCount(): int
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'SELECT COUNT(*) AS total '
            . 'FROM user_vips '
            . 'WHERE status = :status '
            . 'AND expires_at > NOW()'
        );
        $stmt->execute(['status' => 'active']);
        $result = $stmt->fetch();

        return (int) ($result['total'] ?? 0);
    }

    public function getTotalPlayers(): int
    {
        $pdo = Database::connection();
        $stmt = $pdo->query('SELECT COUNT(*) AS total FROM users');
        $result = $stmt->fetch();

        return (int) ($result['total'] ?? 0);
    }

    public function getTodayRenewals(): int
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'SELECT COUNT(*) AS total '
            . 'FROM user_vips '
            . 'WHERE status = :status '
            . 'AND DATE(expires_at) = CURRENT_DATE()'
        );
        $stmt->execute(['status' => 'active']);
        $result = $stmt->fetch();

        return (int) ($result['total'] ?? 0);
    }
}
