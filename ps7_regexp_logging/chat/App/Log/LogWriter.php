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

    public function addErrorHandler($errorHandle)
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
        $this->__construct(new EventHandler($this->config['errorLog'], function ($code) {
            if ($code >= 500) {
                return true;
            }
            return false;
        }));

        $this->addErrorHandler(new EventHandler($this->config['eventLog'], function ($code) {
            if ($code < 500 && $code !== 202) {
                return true;
            }
            return false;
        }));
    }

}
