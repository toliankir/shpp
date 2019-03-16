<?php

namespace App\Services;

use Exception;
use PDO;
use PDOException;

class MysqlService implements IDataService
{
    private $pdo, $period = [];

    /**
     * MysqlService constructor.
     * @throws Exception
     */
    public function __construct()
    {
        $config = require_once dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'Config' . DIRECTORY_SEPARATOR . 'MysqlConfig.php';

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

    public function getCityName($id = 1)
    {
        $stmt = $this->pdo->prepare('SELECT name FROM cities WHERE id=:id');
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $result = $stmt->fetch();
        if (isset($result['name'])) {
            return $result['name'];
        }
        return false;
    }

    public function getWeatherDataPeriod()
    {
        return $this->period;
    }

    public function setPeriod($from, $to)
    {
        $this->period = [];
        $stmt = $this->pdo->prepare('SELECT f.*, UNIX_TIMESTAMP(f.timestamp) AS timestamp, c.name AS city_id 
FROM forecast f LEFT JOIN cities c ON f.city_id = c.id WHERE UNIX_TIMESTAMP(f.timestamp) >= :from AND UNIX_TIMESTAMP(f.timestamp) < :to ');
        $stmt->bindParam(':from', $from);
        $stmt->bindParam(':to', $to);
        $stmt->execute();
        $this->period = $stmt->fetchAll();
    }

    public function dataExist(){
        return count($this->period) > 0;
    }


    public function getLastDate()
    {
        $stmt = $this->pdo->prepare('SELECT UNIX_TIMESTAMP(timestamp) AS timestamp FROM forecast ORDER BY timestamp DESC LIMIT 1');
        $stmt->execute();
        return $stmt->fetch()['timestamp'];
    }
}