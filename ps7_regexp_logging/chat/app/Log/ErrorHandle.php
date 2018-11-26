<?php

namespace app\Log;

class ErrorHandle
{
    private $file;
    private $rule;
    private $next;

    function __construct($file, $rule, $nextHandle = null)
    {
        $this->file = $file;
        $this->rule = $rule;
        $this->next = $nextHandle;
    }

    public function setNextHandle($nextHandle)
    {
        $this->next = $nextHandle;
    }

    public function getNextHandle()
    {
        return $this->next;
    }

    public function writeToLog($code, $msg)
    {

        $rule = $this->rule;

        if ($rule($code)) {
            $msg = Date('d/m/Y H:i:s') . '    ' . $code . ': ' . $msg . "\n";
            file_put_contents($this->file, $msg, FILE_APPEND);
        }

        if ($this->next) {
            $this->next->writeToLog($code, $msg);
        }
    }

}
