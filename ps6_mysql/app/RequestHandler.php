<?php

namespace app;

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

    public function login($user, $password)
    {
        if (isset($_SESSION['user'])) {
            ResponseCreator::responseCreate(401, 'User already login.');
            return;
        }
        try {
            if ($this->service->login($user, $password) === self::UNDEFINED_USER) {
                $this->loginCheck($user);
                $this->passwordCheck($password);
                $this->service->addUser($user, $password);
            }
        } catch (Exception $err) {
            sleep(1);
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
            return;
        }

        try {
            $userId = $this->service->login($user, $password);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
            return;
        }

        $_SESSION['user'] = $user;
        $_SESSION['id'] = $userId;

        $respMsg = 'User login.';
        $moreData = [
            'userId' => $userId,
            'login' => $user
        ];
        ResponseCreator::responseCreate(202, $respMsg, '', $moreData);


    }

    public function logout()
    {
        $respMsg = 'User: ' . $_SESSION['user'] . ' logout';
        session_destroy();
        ResponseCreator::responseCreate(401, $respMsg);
    }

    public function postMessage($message)
    {
        try {
            $this->messageCheck($message);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
            return;
        }
        $message = htmlspecialchars($message);

        try {
            $this->service->sendMessage($_SESSION['id'], $message);
            $respMsg = 'User ' . $_SESSION['user'] . ' post message.';
            ResponseCreator::responseCreate(200, $respMsg);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
        }

    }

    public function getMessages($id)
    {
        $timestamp = $this->getActualTimestamp();
        $chatMessages = $this->service->getMessages($id, $timestamp);

        $respMsg = 'User get messages.';
        $moreData = array('id' => $id,
            'massageCount' => count($chatMessages),
            'queryTimestamp' => $timestamp);
        ResponseCreator::responseCreate(202, $respMsg, $chatMessages, $moreData);
    }

    private function getActualTimestamp()
    {
        $nowTimestamp = Date('U');

        return $nowTimestamp - $this->period;
    }

    public function noLoginUser()
    {
        $respMsg = 'User must to login.';
        ResponseCreator::responseCreate(403, $respMsg);
    }

    /**
     * @param $login
     * @throws Exception
     */
    private function loginCheck($login)
    {
        if (preg_match("/^[0-9a-zA-Z.,_@]{3,128}$/", $login) === 0) {
            throw new Exception('Login \'' . $login . '\' syntax error. Minimum 3 letters or numbers.', 403);
        }
    }

    /**
     * @param $password
     * @throws Exception
     */
    private function passwordCheck($password)
    {
        if (preg_match("/^.{3,128}$/", $password) === 0) {
            throw new Exception('Password \'' . $password . '\' syntax error. Minimum length: 3', 403);
        }
    }

    /**
     * @param $msg
     * @throws Exception
     */
    private function messageCheck($msg)
    {
        if (strlen(trim($msg)) === 0) {
            throw new Exception('User ' . $_SESSION['user'] . ' post empty message.', 200);
        }
    }
}
