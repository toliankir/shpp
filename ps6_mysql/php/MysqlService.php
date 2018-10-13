<?php
require_once "service.php";
require_once "mysqlConfig.php";

class MysqlService extends Exception implements dataService
{
    const DSN = "mysql:host=".DB_HOST.";port=".DB_PORT.";dbname=".DB_NAME.";charset=utf8;";
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
            $stmt = $this->pdo->prepare("SELECT id, login, password FROM users_table WHERE login=:user");
            $stmt->bindParam(":user", $user);
            $stmt->execute();
            $userData = $stmt->fetch();
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }

        if (!$userData) {
            return false;
        }

        if ($userData["login"] == $user && password_verify($password, $userData["password"])) {
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
            $stmt = $this->pdo->prepare("SELECT UNIX_TIMESTAMP(m.timestamp) as timestamp, u.login as user, m.message FROM messages_table m left join users_table u on u.id = m.user WHERE UNIX_TIMESTAMP(timestamp)>:timestamp");
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
        $userId = $this->getUserIdByName($user);
        try {
            $stmt = $this->pdo->prepare("INSERT INTO messages_table (user, message) VALUES (:user, :message)");
            $stmt->bindParam(":user", $userId);
            $stmt->bindParam(":message", $message);
            $stmt->execute();
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }
    }

    private function getUserIdByName($user)
    {
        try {
            $stmt = $this->pdo->prepare("SELECT id FROM users_table WHERE login=:user");
            $stmt->bindParam(':user', $user);
            $stmt->execute();
            return $stmt->fetch()['id'];
        } catch (PDOException $err) {
            throw new Exception($err->getMessage(), 500);
        }
    }
}