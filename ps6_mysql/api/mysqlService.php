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

    function __construct()
    {
        $this->pdo = new PDO(self::DSN, 'wm', '1234', self::OPTIONS);
    }

    /**
     * @param $user
     * @param $password
     * @return bool
     * @throws Exception
     */
    public function login($user, $password)
    {
        $stmt = $this->pdo->prepare("SELECT login, password FROM users_table WHERE login=:user");
        $stmt->bindParam(":user", $user);
        $stmt->execute();
        $userData = $stmt->fetch();

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

    public function addUser($user, $password)
    {
        $stmt = $this->pdo->prepare("INSERT INTO users_table (login, password) VALUES (:user, :password)");
        $stmt->bindParam(":user", $user);
        $stmt->bindParam(":password", password_hash($password, PASSWORD_DEFAULT ));
        $stmt->execute();
    }

    public function getMessages($timestamp)
    {
        $stmt = $this->pdo->prepare("SELECT timestamp, user, message FROM messages_table WHERE timestamp>:timestamp");
        $stmt->bindParam(":timestamp", $timestamp);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function sendMessage($user, $message)
    {
        $stmt = $this->pdo->prepare("INSERT INTO messages_table (timestamp, user, message) VALUES (UNIX_TIMESTAMP(), :user, :message)");
        $stmt->bindParam(":user", $user);
        $stmt->bindParam(":message", $message);
        $stmt->execute();
    }
}