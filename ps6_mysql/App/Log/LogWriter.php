<?php
namespace app\Log;

class LogWriter
{
    private $firstRule;
    private $lastRule;
    private $config;

    function __construct($errorHandle = null)
    {
        $this->config = require dirname(__DIR__,2) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'logConfig.php';
        if ($errorHandle === null) {
        $this->setDefaultLogs();
        return;
        }

        $this->firstRule = $errorHandle;
        $this->lastRule = $this->firstRule;
    }

    public function addErrorHandle($errorHandle)
    {
        $this->lastRule->setNextHandle($errorHandle);
        $this->lastRule = $errorHandle;
    }

    public function addToLog($code, $msg)
    {
        $currentRule = $this->firstRule;
        $currentRule->writeToLog($code, $msg);
    }

    private function setDefaultLogs()
    {
        $this->firstRule = new ErrorHandle($this->config['errorLog'], function ($code) {
            if ($code >= 500) {
                return true;
            }
            return false;
        });
        $this->lastRule = $this->firstRule;

        $this->addErrorHandle(new ErrorHandle($this->config['eventLog'], function ($code) {
            if ($code < 500 && $code !== 202) {
                return true;
            }
            return false;
        }));
    }

}
