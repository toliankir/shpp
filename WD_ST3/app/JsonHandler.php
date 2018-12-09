<?php
/**
 * Created by PhpStorm.
 * User: Tolian
 * Date: 06.12.2018
 * Time: 20:42
 */

namespace app;

use Exception;

class JsonHandler
{
    private $jsonData, $jsonFile;

    /**
     * JsonHandler constructor.
     * @param $jsonFile
     * @throws Exception
     */
    public function __construct($jsonFile)
    {
        $this->jsonFile = $jsonFile;
        $this->jsonData = $this->readJson($jsonFile);
    }

    /**
     * Updates message in object, don't writes changes to file.
     * @param $message
     */
    public function putMessage($message)
    {
        $messageIndex = $this->getIndexById($message['id']);
        if ($messageIndex !== -1) {
            $this->jsonData[$messageIndex] = $message;
        } else {
            $this->jsonData[] = $message;
        }
    }

    public function getAllMessages()
    {
        return $this->jsonData;
    }

    /**
     * Removes message from object, don't writes changes to file.
     * @param $id
     * @return mixed
     * @throws Exception
     */
    public function deleteMessage($id)
    {
        $messageIndex = $this->getIndexById($id);
        if ($messageIndex === -1) {
            throw new Exception('Message dose not exist.');
        }

        $deletedMessage = $this->jsonData[$messageIndex];

        array_splice($this->jsonData, $messageIndex, 1);

        if (count($this->jsonData) === 0) {
            file_put_contents($this->jsonFile, '', LOCK_EX);
            return $deletedMessage;
        }

        return $deletedMessage;
    }

    private function getIndexById($id)
    {
        foreach ($this->jsonData as $index => $message) {
            if ($message['id'] === $id) {
                return $index;
            }
        }
        return -1;
    }

    /**
     * @param $jsonFile
     * @return mixed
     * @throws Exception
     */
    private function readJson($jsonFile)
    {
        if (!file_exists($jsonFile) ||
            !is_readable($jsonFile)) {
            throw new Exception('Json database access error.');
        }

        if (filesize($jsonFile) === 0) {
            return [];
        }

        $json = json_decode(file_get_contents($jsonFile), true);
        if (!$json) {
            throw new Exception('Corrupted json file.');
        }
        return $json;
    }

    /**
     * Writes object data to file.
     * @throws Exception
     */
    public function writeDataToFile()
    {
        if (!file_exists($this->jsonFile) ||
            !is_readable($this->jsonFile) ||
            !is_writable($this->jsonFile)) {
            throw new Exception('Json database access error.');
        }
        return file_put_contents($this->jsonFile, json_encode($this->jsonData, JSON_PRETTY_PRINT), LOCK_EX);
    }
}