<?php
return [
    'resend_api_key' => getenv('RESEND_API_KEY') ?: '',
    'admin_email' => getenv('ADMIN_EMAIL') ?: 'admin@example.com',
    'contact_from_email' => getenv('CONTACT_FROM_EMAIL') ?: 'noreply@example.com',
    'site_url' => getenv('SITE_URL') ?: 'https://example.com',
];
