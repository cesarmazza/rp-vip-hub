<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Database;

final class PaymentRepository
{
    /**
     * @return array<string, mixed>
     */
    public function createPending(int $userId, float $amount, string $method): array
    {
        $pdo = Database::connection();
        $stmt = $pdo->prepare(
            'INSERT INTO payments (user_id, amount, method, status) '
            . 'VALUES (:user_id, :amount, :method, :status)'
        );
        $stmt->execute([
            'user_id' => $userId,
            'amount' => $amount,
            'method' => $method,
            'status' => 'pending',
        ]);

        $id = (int) $pdo->lastInsertId();

        return [
            'id' => $id,
            'user_id' => $userId,
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
}
