<?php
session_start();
if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
//    header('Access-Control-Allow-Credentials: true');
}

$config = require dirname(__DIR__,2).DIRECTORY_SEPARATOR .'config' .DIRECTORY_SEPARATOR. 'dirConfig.php';
define('ROOT_PATH', $config['rootPath']);

spl_autoload_register(function ($className) {
    require ROOT_PATH . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
});

use \app\{MysqlService, RequestHandler, ResponseCreator};

try {
    $requestHandler = new RequestHandler(new MysqlService(), 3600);
} catch (Exception $err) {
    ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
    exit();
}

//Login part
if (isset($_POST['user'], $_POST['password'])) {
    $requestHandler->login($_POST['user'], $_POST['password']);
    exit();
}

//If trying get data with out login.
if (!isset($_SESSION['user'])) {
    $requestHandler->noLoginUser();
    exit();
}

//Logout
if (isset($_POST['logout'])) {
    $requestHandler->logout();
    exit();
}

//Post message
if (isset($_POST['message'])) {
    $requestHandler->postMessage($_REQUEST['message']);
    exit();
}

//Get messages
if (isset($_GET['id'])) {
    $requestHandler->getMessages($_GET['id']);
    exit();
}

