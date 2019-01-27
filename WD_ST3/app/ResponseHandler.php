<?php

namespace app;

class ResponseHandler
{
    public static function responseOk($msg, $text = 'Ok')
    {
        $resp = [
            'statusCode' => 200,
            'statusText' => $text,
            'body' => $msg
        ];

        echo json_encode($resp);
    }

    public static function responseError($msg)
    {
        $resp = [
            'statusCode' => 500,
            'statusText' => $msg
        ];

        echo json_encode($resp);
    }
}