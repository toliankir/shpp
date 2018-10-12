<?php
require "service.php";

class MysqlService extends Exception implements dataService
{
    const DSN = "mysql:host=localhost;port=3306;dbname=chat_db;charset=utf8;";
    const OPTIONS = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    private $pdo;

    /**
     * MysqlService constructor.
     * @throws Exception
     */
    function __construct()
    {
        try {
            $this->pdo = new PDO(self::DSN, 'wm', '1234', self::OPTIONS);
        } catch (PDOException $err) {
            throw new Exception($err, 403);
        }
    }

    /**
     * @param $user
     * @param $password
     * @return bool
     * @throws Exception
     */
    public function login($user, $password)
    {
        try {
            $stmt = $this->pdo->prepare("SELECT login, password FROM users_table WHERE login=:user");
            $stmt->bindParam(":user", $user);
            $stmt->execute();
            $userData = $stmt->fetch();
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }

        if (!$userData) {
            echo 0;
            return false;
        }

        if ($userData["login"] == $user && password_verify($password, $userData["password"])) {
            echo 1;
            return true;
        }

        throw new Exception('incorrect username or password', 401);
    }

    /**
     * @param $user
     * @param $password
     * @throws Exception
     */
    public function addUser($user, $password)
    {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO users_table (login, password) VALUES (:user, :password)");
            $stmt->bindParam(":user", $user);
            $stmt->bindParam(":password", password_hash($password, PASSWORD_DEFAULT));
            $stmt->execute();
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }
    }

    /**
     * @param $timestamp
     * @return array
     * @throws Exception
     */
    public function getMessages($timestamp)
    {
        try {
            $stmt = $this->pdo->prepare("SELECT timestamp, user, message FROM messages_table WHERE timestamp>:timestamp");
            $stmt->bindParam(":timestamp", $timestamp);
            $stmt->execute();
            return $stmt->fetchAll();
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
            $stmt = $this->pdo->prepare("INSERT INTO messages_table (timestamp, user, message) VALUES (UNIX_TIMESTAMP(), :user, :message)");
            $stmt->bindParam(":user", $user);
            $stmt->bindParam(":message", $message);
            $stmt->execute();
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }
    }
}