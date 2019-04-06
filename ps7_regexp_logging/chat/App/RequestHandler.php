<?php

namespace App;

use Exception;

class RequestHandler
{
    const UNDEFINED_USER = -1;
    const DEFAULT_TIME_PERIOD = 3600;
    private $service;
    private $period;

    function __construct($service, $period = self::DEFAULT_TIME_PERIOD)
    {
        $this->service = $service;
        $this->period = $period;
    }

    /**
     * @param $user
     * @param $password
     */
    public function login($user, $password)
    {
        if (isset($_SESSION['user'])) {
            ResponseCreator::responseCreate(401, 'User already login.');
            return;
        }

        if (!$this->loginCheck($user)) {
            ResponseCreator::responseCreate("Login '$user' syntax error. Minimum 3 letters or numbers.", 403);
            return;
        }

        if (!$this->passwordCheck($password)) {
            ResponseCreator::responseCreate("Password '$password' syntax error. Minimum length: 3", 403);
            return;
        }

        if (!$this->userExist($user, $password)) {
            try {
                $this->service->addUser($user, $password);
            } catch (Exception $err) {
                ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
                return;
            }
        }

        try {
            $userId = $this->service->login($user, $password);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
            return;
        }

        if (!$userId) {
            ResponseCreator::responseCreate(401, 'Incorrect username or password.');
            return;
        }

        $_SESSION['user'] = $user;
        $_SESSION['id'] = $userId;

        ResponseCreator::responseCreate(202, 'User login.', '', [
            'userId' => $userId,
            'login' => $user
        ]);

    }

    public function getUserInfo()
    {
        if (!isset($_SESSION['user'], $_SESSION['id'])) {
            ResponseCreator::responseCreate(200, 'User must to login', '');
        }
        ResponseCreator::responseCreate(200, 'User info for user: ' . $_SESSION['user'], [
            'login' => $_SESSION['user'],
            'id' => $_SESSION['id']
        ]);
    }

    public function logout()
    {
        session_destroy();
        ResponseCreator::responseCreate(401, 'User ' . $_SESSION['user'] . ' logout');
    }

    public function postMessage($message)
    {
        if (!$this->messageCheck($message)) {
            ResponseCreator::responseCreate('User ' . $_SESSION['user'] . ' post empty message.', 200);
            return;
        }

        try {
            $this->messageCheck($message);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
            return;
        }
        $message = htmlspecialchars($message);

        try {
            $this->service->sendMessage($_SESSION['id'], $message);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
            return;
        }
        ResponseCreator::responseCreate(200, 'User ' . $_SESSION['user'] . ' post message.');
    }

    public function getMessages($id)
    {
        $timestamp = $this->getActualTimestamp();

        try {
            $chatMessages = $this->service->getMessages($id, $timestamp);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
            return;
        }

        ResponseCreator::responseCreate(200
            , 'User get messages ' . count($chatMessages) . '.'
            , $chatMessages
            , [
                'id' => $id,
                'timePeriod' => $this->period,
                'massageCount' => count($chatMessages),
                'queryTimestamp' => $timestamp
            ]);
    }

    private function getActualTimestamp()
    {
        return date('U') - $this->period;
    }

    public function noLoginUser()
    {
        ResponseCreator::responseCreate(403, 'User must to login.');
    }

    private function loginCheck($login)
    {
        return preg_match("/^[0-9a-zA-Z.,_@]{3,128}$/", $login) !== 0;
    }

    private function passwordCheck($password)
    {
        return strlen($password) > 3 && strlen($password) <= 128;
    }

    private function messageCheck($msg)
    {
        return strlen(trim($msg)) !== 0;
    }

    function userExist($user, $password)
    {
        try {
            if ($this->service->login($user, $password) === self::UNDEFINED_USER) {
                return false;
            }
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
            exit();
        }
        return true;
    }
}
