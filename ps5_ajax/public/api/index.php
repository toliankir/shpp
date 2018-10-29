<?php
session_start();
$config = require_once "../../config/dirConfig.php";
define('ROOT_DIR', $config['rootPath']);

spl_autoload_register(function ($className) {
    require_once ROOT_DIR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
});

use \app\{JsonService, RequestHandler, ResponseCreator};

try {
    $requestHandler = new RequestHandler(new JsonService(), 60 * 60 * 24);
} catch (Exception $err) {
    ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
    exit();
}

//Login part
if (isset($_REQUEST['user']) && isset($_REQUEST['password'])) {
    $requestHandler->login($_REQUEST['user'], $_REQUEST['password']);
    exit();
}

//If trying get data with out login.
if (!isset($_SESSION['user'])) {
    $requestHandler->noLoginUser();
    exit();
}

//Logout
if (isset($_REQUEST['logout'])) {
    $requestHandler->logout();
    exit();
}
//Post message
if (isset($_REQUEST['message'])) {
    $requestHandler->postMessage($_REQUEST['message']);
    exit();
}

//Get messages
if (isset($_REQUEST['timestamp'])) {
    $requestHandler->getMessages($_GET['timestamp']);
    exit();
}

