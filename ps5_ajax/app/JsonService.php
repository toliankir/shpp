<?php

namespace app;

use Exception;

class JsonService implements IDataService
{
    private $config;
    private $usersJson;
    private $chatJson;

    /**
     * JsonService constructor.
     * @throws Exception
     */
    function __construct()
    {
        $this->config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'jsonConfig.php';
        $this->usersJson = $this->checkJsonFile($this->config['usersData']);
        $this->chatJson = $this->checkJsonFile($this->config['chatData']);
    }

    function __destruct()
    {
        if ($this->usersJson) file_put_contents($this->config['usersData'], json_encode($this->usersJson));
        if ($this->chatJson) file_put_contents($this->config['chatData'], json_encode($this->chatJson));
    }

    /**
     * Checks username and password if user accepted return true if use dose not exist
     * return false, if wrong password call exception with code 401.
     * @param $user - user login
     * @param $password - password
     * @return bool
     * @throws Exception
     */
    public function login($user, $password)
    {
        $loginsArray = array_column($this->usersJson, 'login');

        if (!in_array($user, $loginsArray)) {
            return -1;
        }

        $userAccount = $this->usersJson[array_search($user, $loginsArray)];
        if ($userAccount['password'] === $password) {
            return $userAccount['id'];
        }
        throw new Exception('Incorrect username or password.', 401);
    }

    /**
     * Adds user in json base.
     * @param $user
     * @param $password
     * @throws Exception
     */
    public function addUser($user, $password)
    {
        $newUser['id'] = $this->getElementId($this->usersJson);
        $newUser['login'] = $user;
        $newUser['password'] = $password;
        $this->usersJson[] = $newUser;
    }

    /**
     * Get messages from base from timestam to last message. If timestamp is 0 or old, retrun
     * messages for last hour.
     * @param $id
     * @param $timestamp
     * @return array
     */
    public function getMessages($id, $timestamp)
    {
        $chatMessages = [];
        $messageLastIndex = count($this->chatJson) - 1;
        while ($messageLastIndex >= 0) {
            if ($id < $this->chatJson[$messageLastIndex]['id'] && $timestamp < $this->chatJson[$messageLastIndex]['timestamp']) {
                $message = $this->chatJson[$messageLastIndex];
                $message['user'] = $this->getUserById($message['user']);
                $chatMessages[] = $message;
            }
            $messageLastIndex--;
        }
        return array_reverse($chatMessages);
    }

    /**
     * Save message from user in json database.
     * @param $user - Name of current user
     * @param $message - Message text
     */
    public function sendMessage($user, $message)
    {
        $timestamp = Date('U');
        $newMessage['id'] = $this->getElementId($this->chatJson);
        $newMessage['timestamp'] = $timestamp;
        $newMessage['user'] = $user;
        $newMessage['message'] = $message;

        $this->chatJson[] = $newMessage;
    }

    private function getElementId($jsonData)
    {
        if (count($jsonData) === 0) return 0;
        return $jsonData[count($jsonData) - 1]['id'] + 1;
    }


    /**
     * Checks file.
     * @param $checkFile
     * @return mixed
     * @throws Exception
     */
    private function checkJsonFile($checkFile)
    {
        if (!file_exists($checkFile)) {
            throw new Exception('Database dose not exist ' . $checkFile, 404);
        }

        if (!is_readable($checkFile) || !is_writable($checkFile)) {
            throw new Exception('Database is locked ' . $checkFile, 403);
        }

        if (filesize($checkFile) === 0) {
            return Array();
        }

        $usersData = json_decode(file_get_contents($checkFile), true);
        if (!$usersData) {
            throw new Exception('Database is broken ' . $checkFile, 500);
        }

        return $usersData;
    }

    private function getUserById($userId)
    {
        foreach ($this->usersJson as $user) {
            if ($user['id'] === $userId) return $user['login'];
        }
    }
}
