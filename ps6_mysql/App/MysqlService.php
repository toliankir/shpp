<?php

namespace App;

use Exception;
use PDO;
use PDOException;

class MysqlService implements IDataService
{
    const UNDEFINED_USER = -1;
    private $config;
    private $pdo;

    /**
     * MysqlService constructor.
     * @throws Exception
     */
    function __construct()
    {

        $this->config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'mysqlConfig.php';

        $dsn = 'mysql:host=' . $this->config['dbHost'] .
            ';port=' . $this->config['dbPort'] .
            ';dbname=' . $this->config['dbName'] .
            ';charset=' . $this->config['charSet'] . ';';
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];
        try {
            $this->pdo = new PDO($dsn, $this->config['mysqlUser'], $this->config['mysqlPassword'], $options);
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }
    }

    /**
     * @param $user
     * @param $password
     * @return int
     * @throws Exception
     */
    public function login($user, $password)
    {
        try {
            $stmt = $this->pdo->prepare('SELECT * FROM users_table WHERE login=:login');
            $stmt->bindParam(':login', $user);
            $stmt->execute();
            $userData = $stmt->fetch();
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }

        if (!$userData) {
            return $this::UNDEFINED_USER;
        }

        $cryptPassword = crypt($password, $this->config['crypt_salt']);
        if (hash_equals($userData['password'], $cryptPassword)) {
            return $userData['id'];
        }

        throw new Exception('i ncorrect username or password', 401);
    }

    /**
     * @param $user
     * @param $password
     * @throws Exception
     */
    public function addUser($user, $password)
    {
        try {
            $stmt = $this->pdo->prepare('INSERT INTO users_table (login, password) VALUES (:login, :password)');
            $stmt->bindParam(':login', $user);
            $cryptPassword = crypt($password, $this->config['crypt_salt']);
            $stmt->bindParam(':password', $cryptPassword);
            $stmt->execute();
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }
    }

    /**
     * @param $id
     * @param $timestamp
     * @return array
     * @throws Exception
     */
    public function getMessages($id, $timestamp)
    {
        try {
            $stmt = $this->pdo->prepare('SELECT UNIX_TIMESTAMP(m.timestamp) as timestamp, m.id, u.login as user, m.message 
FROM messages_table m LEFT JOIN users_table u ON m.userId = u.id WHERE m.id > :id AND UNIX_TIMESTAMP(m.timestamp) > :timestamp');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':timestamp', $timestamp);
            $stmt->execute();
            $chatMessages = $stmt->fetchAll();
            return $chatMessages;
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }
    }

    /**
     * @param $user
     * @param $message
     * @throws Exception
     */
    public function sendMessage($user, $message)
    {
        try {
            $stmt = $this->pdo->prepare('INSERT INTO messages_table (userId, message) VALUES (:userId, :message)');
            $stmt->bindParam(':userId', $user);
            $stmt->bindParam(':message', $message);
            $stmt->execute();
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }
    }
}