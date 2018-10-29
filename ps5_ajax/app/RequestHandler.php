<?php
namespace app;

use Exception;

class RequestHandler
{
    private $service;
    private $period;

    public function __construct($service, $period = 60 * 60)
    {
        $this->service = $service;
        $this->period = $period;
    }

    public function login($user, $password)
    {
        try {
            if (!$this->service->login($user, $password)) {
                $this->service->addUser($user, $password);
            }

            $this->service->login($user, $password);
            $_SESSION['user'] = $user;

            $respMsg = 'User login.';
            ResponseCreator::responseCreate(200, $respMsg);
        } catch (Exception $err) {
            sleep(1);
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
        }
    }

    public function logout()
    {
        $respMsg = 'User: ' . $_SESSION['user'] . ' logout';
        session_destroy();
        ResponseCreator::responseCreate(401, $respMsg);
    }

    public function postMessage($message)
    {
        $message = str_replace('<', '&lt;', $message);
        $message = str_replace('>', '&gt;', $message);
        try {
            $this->service->sendMessage($_SESSION['user'], $message);
            $respMsg = 'User' . $_SESSION['user'] . 'post message.';
            ResponseCreator::responseCreate(200, $respMsg);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
        }

    }

    public function getMessages($timestamp)
    {
        try {
            $chatMessages = $this->service->getMessages($this->getActualTimestamp($timestamp));

            $respMsg = 'User: ' . $_SESSION['user'] . ' get messages.';
            $moreData = array('massageCount' => count($chatMessages),
                'queryTimestamp' => $timestamp);

            ResponseCreator::responseCreate(200, $respMsg, $chatMessages, $moreData);
        } catch (Exception $err) {
            ResponseCreator::responseCreate($err->getCode(), $err->getMessage());
        }
    }

    private function getActualTimestamp($timestamp)
    {
        $nowTimestamp = Date('U');

        if ($timestamp < $nowTimestamp - $this->period) {
            $timestamp = $nowTimestamp - $this->period;
        }

        return $timestamp;
    }

    public function noLoginUser()
    {
        $respMsg = 'User must to login.';
        ResponseCreator::responseCreate(403, $respMsg);
    }
}

