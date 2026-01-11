<?php

declare(strict_types=1);

namespace App\Controllers;

final class HealthController
{
    public function index(): array
    {
        return [
            'status' => 'ok',
            'service' => 'Loja VIP GTA RP',
        ];
    }
}
