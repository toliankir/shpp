<?php

namespace App\Services;

use Exception;
use PDO;
use PDOException;

class MysqlService implements IDataService
{
    private $pdo, $period = [], $cityId;

    /**
     * MysqlService constructor. Create PDO object of MySql connection.
     * @param $configFile
     * @throws Exception
     */
    public function __construct($configFile)
    {
        $config = require_once $configFile;
        $this->cityId = $config['cityId'];

        $dsn = 'mysql:host=' . $config['dbHost'] .
            ';port=' . $config['dbPort'] .
            ';dbname=' . $config['dbName'] .
            ';charset=' . $config['charSet'] . ';';
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];
        try {
            $this->pdo = new PDO($dsn, $config['mysqlUser'], $config['mysqlPassword'], $options);
        } catch (PDOException $err) {
            throw new Exception('Mysql database connection error.', 500);
        }
    }

    /**
     * Return city name.
     * @return bool
     */
    public function getCityName()
    {
        $stmt = $this->pdo->prepare('SELECT name FROM cities WHERE id=:id');
        $stmt->bindParam(':id', $this->cityId);
        $stmt->execute();
        $result = $stmt->fetch();
        return $result['name'] ?? false;
    }

    /**
     * Return weather for settled period.
     * @return array
     */
    public function getWeatherDataPeriod()
    {
        return $this->period;
    }

    /** Retrieves weather information from MySql database for settled period.
     * @param $from
     * @param $to
     */
    public function setPeriod($from, $to)
    {
        $this->period = [];
        $stmt = $this->pdo->prepare('SELECT f.*, UNIX_TIMESTAMP(f.timestamp) AS timestamp, c.name AS city_id 
FROM forecast f LEFT JOIN cities c ON f.city_id = c.id WHERE f.city_id=:city AND UNIX_TIMESTAMP(f.timestamp) >= :from AND UNIX_TIMESTAMP(f.timestamp) < :to ');
        $stmt->bindParam(':city', $this->cityId);
        $stmt->bindParam(':from', $from);
        $stmt->bindParam(':to', $to);
        $stmt->execute();
        $this->period = $stmt->fetchAll();
    }

    /**
     * Return true if database contain weather for requested period.
     * @return bool
     */
    public function dataExist()
    {
        return !empty($this->period);
    }

    /**
     * Return last date from database with weather data.
     * @return mixed
     */
    public function getLastDate()
    {
        $stmt = $this->pdo->prepare('SELECT UNIX_TIMESTAMP(timestamp) AS timestamp FROM forecast ORDER BY timestamp DESC LIMIT 1');
        $stmt->execute();
        return $stmt->fetch()['timestamp'];
    }
}