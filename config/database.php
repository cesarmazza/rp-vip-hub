<?php

declare(strict_types=1);

return [
    'dsn' => getenv('DB_DSN') ?: 'mysql:host=127.0.0.1;dbname=vip_store;charset=utf8mb4',
    'username' => getenv('DB_USERNAME') ?: 'root',
    'password' => getenv('DB_PASSWORD') ?: '',
];
