<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\LogsRepository;
use App\Models\PaymentRepository;
use App\Models\VipRepository;

final class PaymentController
{
    private PaymentRepository $payments;
    private VipRepository $vips;
    private LogsRepository $logs;

    public function __construct()
    {
        $this->payments = new PaymentRepository();
        $this->vips = new VipRepository();
        $this->logs = new LogsRepository();
    }

    /**
     * @return array{status: int, data: array<string, mixed>}|array<string, mixed>
     */
    public function create(): array
    {
        $payload = $this->readJson();
        $userId = isset($payload['user_id']) ? (int) $payload['user_id'] : 0;
        $planId = isset($payload['vip_plan_id']) ? (int) $payload['vip_plan_id'] : 0;
        $method = isset($payload['method']) && is_string($payload['method']) ? $payload['method'] : 'fake';

        if ($userId === 0 || $planId === 0) {
            return [
                'status' => 422,
                'data' => ['error' => 'user_id e vip_plan_id sao obrigatorios.'],
            ];
        }

        $plan = $this->vips->findPlanById($planId);
        if ($plan === null) {
            return [
                'status' => 404,
                'data' => ['error' => 'Plano VIP nao encontrado.'],
            ];
        }

        $payment = $this->payments->createPending($userId, (float) $plan['price'], $method);
        $this->logs->create('payment_create', $userId, [
            'payment_id' => $payment['id'],
            'vip_plan_id' => $planId,
            'amount' => $payment['amount'],
        ]);

        return [
            'status' => 201,
            'data' => [
                'payment' => $payment,
            ],
        ];
    }

    /**
     * @return array{status: int, data: array<string, mixed>}|array<string, mixed>
     */
    public function confirm(): array
    {
        $payload = $this->readJson();
        $paymentId = isset($payload['payment_id']) ? (int) $payload['payment_id'] : 0;
        $planId = isset($payload['vip_plan_id']) ? (int) $payload['vip_plan_id'] : 0;

        if ($paymentId === 0 || $planId === 0) {
            return [
                'status' => 422,
                'data' => ['error' => 'payment_id e vip_plan_id sao obrigatorios.'],
            ];
        }

        $payment = $this->payments->findById($paymentId);
        if ($payment === null) {
            return [
                'status' => 404,
                'data' => ['error' => 'Pagamento nao encontrado.'],
            ];
        }

        if ($payment['status'] === 'paid') {
            return [
                'data' => [
                    'payment' => $payment,
                    'vip' => null,
                ],
            ];
        }

        $plan = $this->vips->findPlanById($planId);
        if ($plan === null) {
            return [
                'status' => 404,
                'data' => ['error' => 'Plano VIP nao encontrado.'],
            ];
        }

        $updated = $this->payments->markPaid($paymentId);
        if (!$updated) {
            return [
                'status' => 500,
                'data' => ['error' => 'Falha ao confirmar pagamento.'],
            ];
        }

        $vip = $this->vips->renewVip((int) $payment['user_id'], $planId, (int) $plan['duration_days']);

        $this->logs->create('payment_confirm', (int) $payment['user_id'], [
            'payment_id' => $paymentId,
            'vip_plan_id' => $planId,
            'vip_expires_at' => $vip['expires_at'],
        ]);

        return [
            'data' => [
                'payment' => [
                    'id' => (int) $paymentId,
                    'status' => 'paid',
                ],
                'vip' => $vip,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function readJson(): array
    {
        $content = file_get_contents('php://input');
        if (!is_string($content) || $content === '') {
            return [];
        }

        $decoded = json_decode($content, true);

        return is_array($decoded) ? $decoded : [];
    }
}
