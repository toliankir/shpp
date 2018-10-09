<?php
// // phpinfo();
// E_ALL;
// echo '1234';
$dsn = "mysql:host=localhost;port=3306;dbname=test_db;charset=utf8;";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];
// try {
$pdo = new PDO($dsn, 'phpmyadmin', '3Tolian2', $options);
// } catch (Exception $e) {
//     echo $e;
// }
$stmt = $pdo->query("SELECT * FROM test_table");
// var_dump($stmt);
// print_r($stmt->fetch());
// print_r($stmt->fetch());
// print_r($stmt->fetch());
while($row=$stmt->fetch()) {
    var_dump($row);
}

    // foreach($pdo->query('SELECT * from test_table') as $row) {
    //     print_r($row);
    // }

// try {
//     $dbh = new PDO('mysql:host=localhost;dbname=test_db', "testuser", "1234");
//     foreach($dbh->query('SELECT * from test_table') as $row) {
//         print_r($row);
//     }
//     $dbh = null;
// } catch (PDOException $e) {
//     print "Error!: " . $e->getMessage() . "<br/>";
//     die();
// }