<?php

class ErrorHandle
{
    private $file;
    private $rule;
    private $next;

    public function __construct($file, $rule, $nextHandle = null)
    {
        $this->file = $file;
        $this->rule = $rule;
        $this->next = $nextHandle;
    }

    public function setNextHandle($nextHandle)
    {
        $this->next = $nextHandle;
    }

    public function writeToLog($code, $msg)
    {
        if ($this->rule($code)) {
            file_put_contents($this->file, $msg);
        }

        if ($this->next) {
            $this->next->writeToLog($code, $msg);
        }
    }

}