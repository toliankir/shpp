<?php
namespace App;

use App\Log\LogWriter;

class ResponseCreator
{
    public static function responseCreate($code=403, $text='unregistered user', $body='', $moreData=null)
    {
        $log = new LogWriter();

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
