<?php
include 'jsonService.php';
include 'function.php';

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
        header("HTTP/1.1 401 Unauthorized");
        echo 'incorrect username or password';
        exit();
    }
}

//If trying get data with oyt login.
if (!isset($_SESSION['user'])) {
    header("HTTP/1.1 401 Unauthorized");
    echo 'you must to login';
    exit();
}

//Post message
try {
    if (isset($_POST['message'])) {
        $chatService->sendMessage($_SESSION['user'], $_POST['message']);
    }
} catch (Exception $err) {
    errorHandler($err->getMessage());
}

//Get messages
try {
    if (isset($_GET['timestamp'])) {

        echo json_encode($chatService->getMessages($_GET['timestamp']));
    }
} catch (Exception $err) {

    errorHandler($err->getMessage());
}

