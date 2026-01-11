<?php

declare(strict_types=1);

use App\Models\LogsRepository;
use App\Services\Database;

spl_autoload_register(static function (string $class): void {
    $prefix = 'App\\';
    if (str_starts_with($class, $prefix) === false) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $file = __DIR__ . '/../src/' . str_replace('\\', '/', $relativeClass) . '.php';

    if (is_file($file)) {
        require $file;
    }
});

$pdo = Database::connection();
$stmt = $pdo->prepare(
    'UPDATE user_vips '
    . 'SET status = :expired '
    . 'WHERE status = :active '
    . 'AND expires_at <= NOW()'
);
$stmt->execute([
    'expired' => 'expired',
    'active' => 'active',
]);

$updated = $stmt->rowCount();

$logs = new LogsRepository();
$logs->create('vip_expire_cron', null, [
    'expired_count' => $updated,
]);

if (PHP_SAPI === 'cli') {
    echo sprintf("VIPs expirados: %d\n", $updated);
}
