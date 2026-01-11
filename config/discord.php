<?php

declare(strict_types=1);

return [
    'client_id' => getenv('DISCORD_CLIENT_ID') ?: '',
    'client_secret' => getenv('DISCORD_CLIENT_SECRET') ?: '',
    'redirect_uri' => getenv('DISCORD_REDIRECT_URI') ?: 'http://localhost:8000/auth/discord/callback',
    'scopes' => ['identify'],
];
