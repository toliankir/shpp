<?php
include("function.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Warp up ps4</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="output">
<?php
if (!isset($_GET['action'])) {
    echo '<h1>Select task.</h1>';
    exit();
}

echo '<h1>'.$_GET['action'].'</h1>';

if ($_GET["action"] == "task1") {
    echo "<p>" . task1($_GET["Task1Sum1"], $_GET["Task1Sum2"]) . "</p>";
}

if ($_GET["action"] == "task2") {
    echo "<p>" . task2($_GET["Task2Sum1"], $_GET["Task2Sum2"], $_GET["Task2Numbers"]) . "</p>";
}

if ($_GET["action"] == "task3") {
    echo task3($_GET["Task3RowsCol"]);
}

if ($_GET["action"] == "task4") {
    echo '<div class="Task4__canvas">' . task4($_GET["Task8boardSize"]) . '</div>';
}

if ($_GET["action"] == "task5") {
    echo task5($_GET["task5Value"]);
}

if ($_GET["action"] == "task6") {
    task6();
}


?>
<a href="./">&lt;&lt;&lt; Go back</a>
</body>
</html>