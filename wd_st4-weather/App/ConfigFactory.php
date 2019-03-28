<?php

namespace App;


class ConfigFactory
{

    public static function getConfig($service)
    {
        $configDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'Config' . DIRECTORY_SEPARATOR;

        $configFile = null;
        switch (ucfirst($service)) {
            case 'Mysql':
                $configFile = $configDir . 'MysqlConfig.php';
                break;
            case 'Json':
                $configFile = $configDir . 'JsonConfig.php';
                break;
            case 'External':
                $configFile = $configDir . 'ExternalConfig.php';
                break;
            default:
                return false;
        }
        if (!file_exists($configDir)) {
            return false;
        }
        return require $configFile;

    }
}