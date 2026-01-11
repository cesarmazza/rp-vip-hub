<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\MetricsRepository;

final class DashboardController
{
    private MetricsRepository $metrics;

    public function __construct()
    {
        $this->metrics = new MetricsRepository();
    }

    /**
     * @return array<string, mixed>
     */
    public function metrics(): array
    {
        return [
            'receita_mes' => $this->metrics->getMonthlyRevenue(),
            'vips_ativos' => $this->metrics->getActiveVipCount(),
            'total_jogadores' => $this->metrics->getTotalPlayers(),
            'renovacoes_hoje' => $this->metrics->getTodayRenewals(),
        ];
    }
}
