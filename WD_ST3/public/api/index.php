<?php

$config = require_once '../../config/config.php';
define('ROOT_PATH', $config['appDir']);

spl_autoload_register(function ($className) {
    require ROOT_PATH . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
});

use  app\{
    JsonHandler, ResponseHandler
};

try {
    $json = new JsonHandler($config['json']);
} catch (Exception $err) {
    ResponseHandler::responseError($err->getMessage());
    exit();
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $resp = $json->getAllMessages();
    ResponseHandler::responseOk($resp, 'Get ' . count($resp) . ' messages.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['messages'])) {
        ResponseHandler::responseError('Wrong response.');
        exit();
    }

    $put_msg = [];
    $del_msg = [];
    $err_msg = [];
    foreach ($_POST['messages'] as $message) {
        if ($message['body'] === $message['id']) {
            try {
                $json->deleteMessage($message['id']);
                $del_msg[] = $message['id'];
            } catch (Exception $err) {
                $err_msg[] = $message['id'];
            }
            continue;
        }
        $json->putMessage($message);
        $put_msg[] = $message['id'];
    }

    try {
        if ($json->writeDataToFile() !== false) {
            ResponseHandler::responseOk([
                'putted' => $put_msg,
                'deleted' => $del_msg,
                'error' => $err_msg
            ], count($_POST['messages']) . ' message(s) handled. Update: '
                . count($put_msg) . '. Delete: ' . count($del_msg)
                . '. Error: ' . count($err_msg) . '.');
        }
    } catch (Exception $err) {
        ResponseHandler::responseError($err->getMessage());
    }

}
