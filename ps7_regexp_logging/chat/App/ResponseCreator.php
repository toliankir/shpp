<?php

namespace App;

use App\Log\EventHandler;
use App\Log\LogWriter;

class ResponseCreator
{
    public static function responseCreate($code = 403, $text = 'unregistered user', $body = '', $moreData = null)
    {
        $config = require ROOT_PATH . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'logConfig.php';

        $log = new LogWriter(new EventHandler($config['errorLog'], function ($code, $msg=null) {
            if ($code >= 500) {
                return true;
            }
            return false;
        }));

        $log->addEventHandler(new EventHandler($config['eventLog'], function ($code, $msg=null) {
            if ($code < 500 && $msg !== 'User get messages 0.') {
                return true;
            }
            return false;
        }));

        $outArray = array('timestamp' => date('U'),
            'statusCode' => $code,
            'statusText' => $text,
            'body' => $body
        );
        if ($moreData) {
            $outArray = array_merge($outArray, $moreData);
        }
        $log->addToLog($code, $text);
        echo json_encode($outArray);
    }
}
