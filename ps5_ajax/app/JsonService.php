<?php

namespace app;

use Exception;

class JsonService implements IDataService
{
    private $config;

    public function __construct()
    {
        $this->config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'jsonConfig.php';
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
        $usersBase = $this->checkJsonFile($this->config['usersData']);
        $loginsArray = array_column($usersBase, 'login');

        if (!in_array($user, $loginsArray)) {
            return false;
        }

        $userAccount = $usersBase[array_search($user, $loginsArray)];

        if ($userAccount['password'] === $password) {
            return true;
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
        $usersInBase = $this->checkJsonFile($this->config['usersData']);

        $newUser['login'] = $user;
        $newUser['password'] = $password;
        $usersInBase[] = $newUser;

        file_put_contents($this->config['usersData'], json_encode($usersInBase));
    }

    /**
     * Get messages from base from timestam to last message. If timestamp is 0 or old, retrun
     * messages for last hour.
     * @param $timestamp
     * @return array
     * @throws Exception
     */
    public function getMessages($id, $timestamp)
    {
        $chatBase = $this->checkJsonFile($this->config['chatData']);

        $chatMessages = [];
        $messageIndex = count($chatBase) - 1;
        while ($messageIndex >= 0) {
            if ($id < $chatBase[$messageIndex]['id'] && $timestamp < $chatBase[$messageIndex]['timestamp']) {
                $chatMessages[] = $chatBase[$messageIndex];
            }
            $messageIndex--;
        }
        return array_reverse($chatMessages);
    }

    /**
     * Save message from user in json database.
     * @param $user - Name of current user
     * @param $message - Message text
     * @throws Exception
     */
    public function sendMessage($user, $message)
    {
        $chatBase = $this->checkJsonFile($this->config['chatData']);

        $timestamp = Date('U');
        $newMessage['id'] = $chatBase[count($chatBase) - 1]['id'] + 1;
        $newMessage['timestamp'] = $timestamp;
        $newMessage['user'] = $user;
        $newMessage['message'] = $message;

        $chatBase[] = $newMessage;

        file_put_contents($this->config['chatData'], json_encode($chatBase));
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
}
