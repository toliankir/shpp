<?php

namespace App;


class ConfigFactory
{

    public static function getConfig($service)
    {
        $configDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'Config' . DIRECTORY_SEPARATOR;

        switch (ucfirst($service)) {
            case 'Mysql':
                return $configDir . 'MysqlConfig.php';
            case 'Json':
                return $configDir . 'JsonConfig.php';
            case 'External':
                return $configDir . 'ExternalConfig.php';
            default:
                return false;
        }


    }
}