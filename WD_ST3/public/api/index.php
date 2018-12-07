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

if (!isset($_GET['action'])) {
    ResponseHandler::responseError('Wrong response.');
    exit();
}

if ($_GET['action'] === 'getAllMessages') {
    $resp = $json->getAllMessages();
    ResponseHandler::responseOk($resp, 'Get ' . count($resp) . ' messages.');
}

if ($_GET['action'] === 'deleteMessage') {
    if (!isset($_GET['id'])) {
        ResponseHandler::responseError('Wrong response.');
        exit();
    }
    try {
        ResponseHandler::responseOk($json->deleteMessage((int)$_GET['id']), 'Message ' . $_GET['id'] . ' delete.');
    } catch (Exception $err) {
        ResponseHandler::responseError($err->getMessage());
        exit();
    }
}

if ($_GET['action'] === 'put') {
    if (!isset($_GET['id'], $_GET['body'])) {
        ResponseHandler::responseError('Wrong response.');
        exit();
    }
    $msg = ['id' => (int)$_GET['id'],
        'body' => $_GET['body']];

    $json->putMessage($msg);
    ResponseHandler::responseOk($msg, 'Message #' . $_GET['id'] . 'putted.');
}
