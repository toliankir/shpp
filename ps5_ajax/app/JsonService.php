<?php
require_once SERVICE_INTERFACE;

class jsonService extends Exception implements dataService
{

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
        $usersBase = $this->checkJsonFile(USER_DATA_FILE);
        $loginsArray = array_column($usersBase, 'login');

        if (!in_array($user, $loginsArray)) {
            return false;
        }

        $userAccount = $usersBase[array_search($user, $loginsArray)];

        if ($userAccount['password'] == $password) {
            return true;
        }
        throw new Exception('incorrect username or password', 401);

    }

    /**
     * Adds user in json base.
     * @param $user
     * @param $password
     * @throws Exception
     */
    public function addUser($user, $password)
    {
        $usersInBase = $this->checkJsonFile(USER_DATA_FILE);

        $newUser['login'] = $user;
        $newUser['password'] = $password;
        $usersInBase[] = $newUser;

        file_put_contents(USER_DATA_FILE, json_encode($usersInBase));
    }

    /**
     * Get messages from base from timestam to last message. If timestamp is 0 or old, retrun
     * messages for last hour.
     * @param $timestamp
     * @return array
     * @throws Exception
     */
    public function getMessages($timestamp)
    {

        $chatBase = $this->checkJsonFile(CHAT_DATA_FILE);


        $chatMessages = [];
        $messageIndex = sizeof($chatBase) - 1;
        while ($messageIndex >= 0 & $timestamp < $chatBase[$messageIndex]['timestamp']) {
            $chatMessages[] = $chatBase[$messageIndex--];
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
        $chatBase = $this->checkJsonFile(CHAT_DATA_FILE);
        $timestamp = Date('U');
        $newMessage['timestamp'] = $timestamp;
        $newMessage['user'] = $user;
        $newMessage['message'] = $message;

        $chatBase[] = $newMessage;

        file_put_contents(CHAT_DATA_FILE, json_encode($chatBase));
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
            throw new Exception('Database dose not exist', 404);
        }

        if (!is_readable($checkFile) || !is_writable($checkFile)) {
            throw new Exception('Database is locked', 403);
        }
        $usersData = json_decode(file_get_contents($checkFile), true);
        if (!$usersData && filesize($checkFile) > 0) {
            throw new Exception('Database is broken', 500);
        }

        return $usersData;
    }
}