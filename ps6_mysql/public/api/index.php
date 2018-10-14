<?php
require_once "../../app/function.php";
require_once '../../app/MysqlService.php';

const MESSAGE_PERIOD = 60 * 60;
session_start();
;
try {
    $chatService = new MysqlService();
} catch (Exception $err) {
    errorHandler($err->getMessage(), $err->getCode());
}

if (isset($_POST['logout'])) {
    session_destroy();
}
//Login part
if (isset($_POST['user']) && isset($_POST['password'])) {
    try {
        if (!$chatService->login($_POST['user'], $_POST['password'])) {
            $chatService->addUser($_POST['user'], $_POST['password']);
        }
        $userId = $chatService->login($_POST['user'], $_POST['password']);
        $_SESSION['user'] = $_POST['user'];
    } catch (Exception $err) {
        errorHandler($err->getMessage(), $err->getCode());
    }
}

//If trying get data with out login.
if (!isset($_SESSION['user'])) {
    errorHandler('you must to login', 401);
}

//Post message
try {
    if (isset($_POST['message'])) {
        $message = str_replace('<', '&lt;', $_POST['message']);
        $message = str_replace('>', '&gt;', $message);
        $chatService->sendMessage($_SESSION['user'], $message);
    }
} catch (Exception $err) {
    errorHandler($err->getMessage(), $err->getCode());
}

//Get messages
try {
    if (isset($_GET['timestamp'])) {
        $nowTimestamp = Date('U');
        $timestamp = $_GET['timestamp'];
        if ($timestamp < $nowTimestamp - MESSAGE_PERIOD) {
            $timestamp = $nowTimestamp - MESSAGE_PERIOD;
        }
        echo json_encode($chatService->getMessages($timestamp));
    }
} catch (Exception $err) {
    errorHandler($err->getMessage(), $err->getCode());
}