<?php

namespace App\Log;

class LogWriter
{
    private $firstRule;
    private $config;

    function __construct($errorHandle = null)
    {

        $this->config = require ROOT_PATH . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'logConfig.php';
        if ($errorHandle === null) {
            $this->setDefaultLogs();
            return;
        }

        $this->firstRule = $errorHandle;
    }

    public function addEventHandler($errorHandle)
    {
        $rule = $this->firstRule;

        while ($rule->getNextHandler() !== null) {
            $rule = $rule->getNextHandler();
        }

        $rule->setNextHandler($errorHandle);
    }

    public function addToLog($code, $msg)
    {
        ($this->firstRule)->writeToLog($code, $msg);
    }

    private function setDefaultLogs()
    {
        $this->firstRule = new EventHandler($this->config['errorLog'], function ($code, $msg=null) {
            if ($code >= 500) {
                return true;
            }
            return false;
        });

        $this->addEventHandler(new EventHandler($this->config['eventLog'], function ($code, $msg=null) {
            if ($code < 500 && $msg !== 'User get messages 0.') {
                return true;
            }
            return false;
        }));
    }

}
