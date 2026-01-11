<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\LogsRepository;
use App\Models\VipRepository;

final class VipController
{
    private VipRepository $vips;
    private LogsRepository $logs;

    public function __construct()
    {
        $this->vips = new VipRepository();
        $this->logs = new LogsRepository();
    }

    /**
     * @return array<string, mixed>
     */
    public function list(): array
    {
        return [
            'plans' => $this->vips->listPlans(),
            'vips' => $this->vips->listVipEntries(),
        ];
    }

    /**
     * @return array{status: int, data: array<string, mixed>}|array<string, mixed>
     */
    public function renew(): array
    {
        $payload = $this->readJson();
        $userId = isset($payload['user_id']) ? (int) $payload['user_id'] : 0;
        $planId = isset($payload['vip_plan_id']) ? (int) $payload['vip_plan_id'] : 0;

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

        $record = $this->vips->renewVip($userId, $planId, (int) $plan['duration_days']);
        $this->logs->create('vip_renew', $userId, [
            'vip_plan_id' => $planId,
            'expires_at' => $record['expires_at'],
        ]);

        return [
            'status' => 201,
            'data' => [
                'vip' => $record,
            ],
        ];
    }

    /**
     * @return array{status: int, data: array<string, mixed>}|array<string, mixed>
     */
    public function suspend(): array
    {
        $payload = $this->readJson();
        $vipId = isset($payload['user_vip_id']) ? (int) $payload['user_vip_id'] : 0;

        if ($vipId === 0) {
            return [
                'status' => 422,
                'data' => ['error' => 'user_vip_id e obrigatorio.'],
            ];
        }

        $success = $this->vips->suspendVip($vipId);
        if (!$success) {
            return [
                'status' => 404,
                'data' => ['error' => 'VIP nao encontrado.'],
            ];
        }

        $this->logs->create('vip_suspend', null, [
            'user_vip_id' => $vipId,
        ]);

        return [
            'data' => [
                'status' => 'suspended',
                'user_vip_id' => $vipId,
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
