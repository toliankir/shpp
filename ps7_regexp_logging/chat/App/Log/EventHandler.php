<?php

namespace App\Log;

class EventHandler
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

    public function setNextHandler(EventHandler $nextHandle)
    {
        $this->next = $nextHandle;
    }

    public function getNextHandler()
    {
        return $this->next;
    }

    public function writeToLog($code, $msg)
    {
        $backtrace = debug_backtrace();
        $lastBacktrace = end($backtrace);

        if (($this->rule)($code, $msg)) {
            $msg = date('Y/m/d H:i:s') . '    '
                . $_SERVER['REMOTE_ADDR'] . '   '
                . ($_SESSION['id'] ?? '') . '   '
                . $lastBacktrace['class'] . '->' . $lastBacktrace['function'] . ':' . $lastBacktrace['line'] . ' '
                . $code . ':' . $msg . "\n";
            file_put_contents($this->file, $msg, FILE_APPEND);
        }

        if ($this->next) {
            $this->next->writeToLog($code, $msg);
        }
    }

}
