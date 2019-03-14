<?php

namespace App;

class ResponseCreator
{
    public static function responseCreate($status, $code, $body = [], $ext = null)
    {
        $result = [
            'timestamp' => date('U'),
            'code' => $code,
            'statusText' => $status,
            'body' => $body
        ];
        if ($ext) {
            $result = array_merge($result, $ext);
        }
        echo json_encode($result);
    }
}