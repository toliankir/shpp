<?php
require 'jsonService.php';
require 'function.php';

session_start();
$chatService = new jsonService();

//Login part
if (isset($_POST['user']) && isset($_POST['password'])) {
    try {
        if (!$chatService->login($_POST['user'], $_POST['password'])) {
            $chatService->addUser($_POST['user'], $_POST['password']);
        }
        $_SESSION['user'] = $_POST['user'];
    } catch (Exception $err) {
        errorHandler($err->getMessage(), $err->getCode());
    }
}

//If trying get data with oyt login.
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
        echo json_encode($chatService->getMessages($_GET['timestamp']));
    }
} catch (Exception $err) {
    errorHandler($err->getMessage(), $err->getCode());
}

