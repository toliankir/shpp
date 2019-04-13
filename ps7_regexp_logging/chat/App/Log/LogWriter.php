<?php

namespace App\Log;

class LogWriter
{
    private $firstRule;

    function __construct(EventHandler $eventHandler = null)
    {
        $this->firstRule = $eventHandler;
    }

    public function addEventHandler($eventHandler)
    {
        $rule = $this->firstRule;

        while ($rule->getNextHandler() !== null) {
            $rule = $rule->getNextHandler();
        }

        $rule->setNextHandler($eventHandler);
    }

    public function addToLog($code, $msg)
    {
        $this->firstRule->writeToLog($code, $msg);
    }
}
