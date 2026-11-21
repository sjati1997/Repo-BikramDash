<?php
header('Content-Type: application/json; charset=utf-8');

http_response_code(503);

echo json_encode([
  'success' => false,
  'message' => 'The contact email backend is not configured in this phase. Please use the placeholder contact details until the PHP mail integration is enabled.'
], JSON_THROW_ON_ERROR);
