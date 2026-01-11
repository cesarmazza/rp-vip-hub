<?php

declare(strict_types=1);

use App\Controllers\AuthController;
use App\Controllers\DashboardController;
use App\Controllers\HealthController;
use App\Controllers\LogsController;
use App\Controllers\PaymentController;
use App\Controllers\VipController;
use App\Middleware\AdminMiddleware;
use App\Middleware\AuthMiddleware;
use App\Services\Router;

return static function (Router $router): void {
    $authMiddleware = [new AuthMiddleware(), 'handle'];
    $adminMiddleware = [new AdminMiddleware(), 'handle'];

    $router->get('/health', [new HealthController(), 'index']);

    $authController = new AuthController();
    $router->get('/auth/discord', [$authController, 'redirect']);
    $router->get('/auth/discord/callback', [$authController, 'callback']);
    $router->get('/me', [$authController, 'me'], [$authMiddleware]);

    $dashboardController = new DashboardController();
    $router->get('/dashboard/metrics', [$dashboardController, 'metrics'], [$authMiddleware, $adminMiddleware]);

    $vipController = new VipController();
    $router->get('/vips', [$vipController, 'list'], [$authMiddleware, $adminMiddleware]);
    $router->post('/vip/renew', [$vipController, 'renew'], [$authMiddleware, $adminMiddleware]);
    $router->post('/vip/suspend', [$vipController, 'suspend'], [$authMiddleware, $adminMiddleware]);

    $paymentController = new PaymentController();
    $router->get('/payments', [$paymentController, 'list'], [$authMiddleware, $adminMiddleware]);
    $router->post('/payment/create', [$paymentController, 'create'], [$authMiddleware, $adminMiddleware]);
    $router->post('/payment/confirm', [$paymentController, 'confirm'], [$authMiddleware, $adminMiddleware]);

    $logsController = new LogsController();
    $router->get('/logs', [$logsController, 'list'], [$authMiddleware, $adminMiddleware]);
};
