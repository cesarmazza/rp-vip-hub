<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Database;

final class PaymentRepository
{
    /**
     * @return array<string, mixed>
     */
    public function createPending(int $userId, int $planId, float $amount, string $method): array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'INSERT INTO payments (user_id, vip_plan_id, amount, method, status) '
            . 'VALUES (:user_id, :vip_plan_id, :amount, :method, :status)'
        );
        $stmt->execute([
            'user_id' => $userId,
            'vip_plan_id' => $planId,
            'amount' => $amount,
            'method' => $method,
            'status' => 'pending',
        ]);

        $id = (int) $pdo->lastInsertId();

        return [
            'id' => $id,
            'user_id' => $userId,
            'vip_plan_id' => $planId,
            'amount' => $amount,
            'method' => $method,
            'status' => 'pending',
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public function findById(int $id): ?array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('SELECT * FROM payments WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $payment = $stmt->fetch();

        return is_array($payment) ? $payment : null;
    }

    public function markPaid(int $id): bool
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare('UPDATE payments SET status = :status WHERE id = :id');
        $stmt->execute([
            'status' => 'paid',
            'id' => $id,
        ]);

        return $stmt->rowCount() > 0;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function listRecent(int $limit = 50): array
    {
        $pdo = Database::connection();
        $limit = max(1, min($limit, 200));
        $stmt = $pdo->prepare(
            'SELECT payments.id, payments.user_id, payments.vip_plan_id, payments.amount, payments.method, '
            . 'payments.status, payments.created_at, users.username, users.discord_id, vip_plans.name AS plan_name '
            . 'FROM payments '
            . 'INNER JOIN users ON users.id = payments.user_id '
            . 'INNER JOIN vip_plans ON vip_plans.id = payments.vip_plan_id '
            . 'ORDER BY payments.created_at DESC '
            . 'LIMIT :limit'
        );
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        $payments = $stmt->fetchAll();

        return is_array($payments) ? $payments : [];
    }
}
