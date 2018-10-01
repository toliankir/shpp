<?php
include "service.php";

class jsonService extends Exception implements dataService
{
    const USER_DATA_FILE = '../json/users.json';
    const CHAT_DATA_FILE = '../json/chatdata.json';
    const MESSAGE_PERIOD = 60 * 60;

    /**
     * @param $user
     * @param $password
     * @return bool
     * @throws Exception
     */
    public function login($user, $password)
    {
        $usersBase = $this->checkJsonFile(self::USER_DATA_FILE);
        $userIndex = array_search($user, array_column($usersBase, 'login'));
        $account = $usersBase[$userIndex];

        if ($account['password'] == $password) {
            return true;
        }

        if ($account) {
            throw new Exception(401);
        }

        return false;
    }

    /**
     * @param $user
     * @param $password
     * @throws Exception
     */
    public function addUser($user, $password)
    {
        $usersInBase = $this->checkJsonFile(self::USER_DATA_FILE);

        $newUser['login'] = $user;
        $newUser['password'] = $password;
        $usersInBase[] = $newUser;

        file_put_contents(self::USER_DATA_FILE, json_encode($usersInBase));
    }

    /**
     * @param $timestamp
     * @return array
     * @throws Exception
     */
    public function getMessages($timestamp)
    {

        $chatBase = $this->checkJsonFile(self::CHAT_DATA_FILE);
        $nowTimestamp = Date('U');

        if ($timestamp < $nowTimestamp - self::MESSAGE_PERIOD) {
            $timestamp = $nowTimestamp - self::MESSAGE_PERIOD;
        }

        $chatMessages = [];
        $messageIndex = sizeof($chatBase) - 1;
        while ($messageIndex >= 0 & $timestamp < $chatBase[$messageIndex]['timestamp']) {
            $chatMessages[] = $chatBase[$messageIndex--];
        }
        return array_reverse($chatMessages);
    }

    /**
     * @param $user - Name of current user
     * @param $message - Message text
     * @throws Exception
     */
    public function sendMessage($user, $message)
    {
        $chatBase = $this->checkJsonFile(self::CHAT_DATA_FILE);
        $timestamp = Date('U');
        $newMessage['timestamp'] = $timestamp;
        $newMessage['user'] = $user;
        $newMessage['message'] = $message;

        $chatBase[] = $newMessage;

        file_put_contents(self::CHAT_DATA_FILE, json_encode($chatBase));
    }

    /**
     * @param $checkFile
     * @return mixed
     * @throws Exception
     */
    private function checkJsonFile($checkFile)
    {
        if (!file_exists($checkFile)) {
            throw new Exception(404);
        }

        if (!is_readable($checkFile) || !is_writable($checkFile)) {
            throw new Exception(403);
        }

        $usersData = json_decode(file_get_contents($checkFile), true);
        if (!$usersData && filesize($checkFile) > 0) {
            throw new Exception(500);
        }

        return $usersData;
    }
}