<?php
const LOG_FILE = 'log/chat.log';

const ERROR_CODE = array(
    401 => 'HTTP/1.1 401 Unauthorized',
    403 => 'HTTP/1.0 403 Forbidden',
    404 => 'HTTP/1.0 404 Not Found',
    500 => 'HTTP/1.1 500 Internal Server Error'
);

/**
 * Create exception message and header for http response.
 */
function errorHandler($error_msg, $error_code)
{
    header(ERROR_CODE[$error_code]);
//    writeLog($error_code . ':' . $error_msg);
    if ($error_code == '401') {
        echo $error_msg;
    } else {
        echo 'Details in log file.';
    }
    exit();
}

function writeLog($logData)
{
    if (!file_exists('../' . LOG_FILE) || !is_writable('../' . LOG_FILE)) {
        return;
    }

    $outputLog = Date('Y-m-d H:i:s') . '  ' . $logData . "\n";
    file_put_contents('../' . LOG_FILE, $outputLog, FILE_APPEND);
}