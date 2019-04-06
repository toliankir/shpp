<?php
session_start();
if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
//    header('Access-Control-Allow-Credentials: true');
}
define('ROOT_PATH', dirname(__DIR__, 2));
spl_autoload_register(function ($className) {
    $file = ROOT_PATH . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
    if (file_exists($file)) {
        require $file;
    }
    return false;
});


use \App\{
    MysqlService, RequestHandler, ResponseCreator
};

try {
    $requestHandler = new RequestHandler(new MysqlService(), 3600);
} catch (Exception $err) {
    ResponseCreator::responseCreate($err->getCode(), 'MySql connection error.');
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

