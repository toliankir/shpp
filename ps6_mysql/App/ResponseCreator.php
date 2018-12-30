<?php
namespace app;

use app\Log\LogWriter;

class ResponseCreator
{
    public static function responseCreate($code=403, $text='unregistered user', $body='', $moreData=null)
    {
        $log = new LogWriter();

        $outArray = array('timestamp' => Date('U'),
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
