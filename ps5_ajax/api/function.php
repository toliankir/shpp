<?php
const ERROR_CODE = array(
    401 => 'HTTP/1.1 401 Unauthorized',
    403 => 'HTTP/1.0 403 Forbidden',
    404 => 'HTTP/1.0 404 Not Found',
    500 => 'HTTP/1.1 500 Internal Server Error'
);

function errorHandler($error)
{
    header(ERROR_CODE[$error]);
    echo 'Test exception';
    exit();
}