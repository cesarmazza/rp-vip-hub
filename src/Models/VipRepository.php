<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Database;
use DateTimeImmutable;

final class VipRepository
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function listPlans(): array
    {
        $pdo = Database::connection();
        $stmt = $pdo->query('SELECT id, name, price, duration_days, benefits FROM vip_plans ORDER BY price ASC');
        $plans = $stmt->fetchAll();

        return is_array($plans) ? $plans : [];
    }

    /**
     * @return array<string, mixed>|null
     */
    public function findPlanById(int $id): ?array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('SELECT id, name, price, duration_days, benefits FROM vip_plans WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $plan = $stmt->fetch();

        return is_array($plan) ? $plan : null;
    }

    /**
     * @return array<string, mixed>|null
     */
    public function findActiveVipByUser(int $userId): ?array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'SELECT * FROM user_vips '
            . 'WHERE user_id = :user_id '
            . 'AND status = :status '
            . 'AND expires_at > NOW() '
            . 'ORDER BY expires_at DESC '
            . 'LIMIT 1'
        );
        $stmt->execute([
            'user_id' => $userId,
            'status' => 'active',
        ]);
        $vip = $stmt->fetch();

        return is_array($vip) ? $vip : null;
    }

    public function renewVip(int $userId, int $planId, int $durationDays): array
    {
        $pdo = Database::connection();
        $currentVip = $this->findActiveVipByUser($userId);

        $baseDate = new DateTimeImmutable();
        if (is_array($currentVip) && !empty($currentVip['expires_at'])) {
            $currentExpiry = new DateTimeImmutable((string) $currentVip['expires_at']);
            if ($currentExpiry > $baseDate) {
                $baseDate = $currentExpiry;
            }
        }

        $newExpiry = $baseDate->modify(sprintf('+%d days', $durationDays));

        $stmt = $pdo->prepare(
            'INSERT INTO user_vips (user_id, vip_plan_id, expires_at, status) '
            . 'VALUES (:user_id, :vip_plan_id, :expires_at, :status)'
        );
        $stmt->execute([
            'user_id' => $userId,
            'vip_plan_id' => $planId,
            'expires_at' => $newExpiry->format('Y-m-d H:i:s'),
            'status' => 'active',
        ]);

        $id = (int) $pdo->lastInsertId();

        return [
            'id' => $id,
            'user_id' => $userId,
            'vip_plan_id' => $planId,
            'expires_at' => $newExpiry->format('Y-m-d H:i:s'),
            'status' => 'active',
        ];
    }

    public function suspendVip(int $vipId): bool
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('UPDATE user_vips SET status = :status WHERE id = :id');
        $stmt->execute([
            'status' => 'suspended',
            'id' => $vipId,
        ]);

        return $stmt->rowCount() > 0;
    }
}
