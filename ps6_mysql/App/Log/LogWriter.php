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
        }

        if ($errorHandle !== null) {
            $this->firstRule = $errorHandle;
        }
    }

    public function addErrorHandle($errorHandle)
    {
        if ($this->firstRule === null) {
            $this->firstRule = $errorHandle;
            return;
        }

        $rule = $this->firstRule;

        while ($rule->getNextHandle() !== null) {
            $rule = $rule->getNextHandle();
        }

        $rule->setNextHandle($errorHandle);
    }

    public function addToLog($code, $msg)
    {
        ($this->firstRule)->writeToLog($code, $msg);
    }

    private function setDefaultLogs()
    {
        $this->addErrorHandle(new ErrorHandle($this->config['errorLog'], function ($code) {
            if ($code >= 500) {
                return true;
            }
            return false;
        }));

        $this->addErrorHandle(new ErrorHandle($this->config['eventLog'], function ($code) {
            if ($code < 500 && $code !== 202) {
                return true;
            }
            return false;
        }));
    }

}
