<?php

declare(strict_types=1);

return [
    'secret' => getenv('JWT_SECRET') ?: 'change-me',
    'issuer' => getenv('JWT_ISSUER') ?: 'loja-vip',
    'audience' => getenv('JWT_AUDIENCE') ?: 'loja-vip-clients',
    'ttl' => (int) (getenv('JWT_TTL') ?: 3600),
];
