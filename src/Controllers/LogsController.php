<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\LogsRepository;

final class LogsController
{
    private LogsRepository $logs;

    public function __construct()
    {
        $this->logs = new LogsRepository();
    }

    /**
     * @return array<string, mixed>
     */
    public function list(): array
    {
        return [
            'logs' => $this->logs->listRecent(),
        ];
    }
}
