<?php
require "function.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Warp up ps4</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<div class="Task">
    <h3>Task 1</h3>
    <p>Посчитать сумму чисел от -1000 до 1000</p>
    <form action="index.php" method="get">
        <input type="hidden" name="action" value="task1">
        <span>First number:</span>
        <input title="First number" type="number" name="Task1Sum1" value="-1000" min="-1000">
        <span>Second number:</span>
        <input title="Second number" type="number" name="Task1Sum2" value="1000">
        <input type="submit" title="Calculate" value="Calculate">
    </form>
    <p>
        <?php
        if ($_GET["action"] == "task1") {
            echo task1($_GET["Task1Sum1"], $_GET["Task1Sum2"]);
        }
        ?>
    </p>
</div>

<div class="Task">
    <h3>Task 2</h3>
    <p>Посчитать сумму чисел от -1000 до 1000, суммируя только числа которые заканчиваются на 2,3, и 7</p>
    <form action="index.php" method="get">
        <input type="hidden" name="action" value="task2">
        <span>First number:</span>
        <input title="First number" type="number" name="Task2Sum1" value="-1000">
        <span>Second number:</span>
        <input title="Second number" type="number" name="Task2Sum2" value="1000">
        <span>Last numbers to calculate:</span>
        <input title="Last numeral of number" type="text" name="Task2Numbers" value="2,3,7" pattern="^[0-9,]+$">
        <input type="submit" title="Calculate" value="Calculate">
    </form>
    <p>
        <?php
        if ($_GET["action"] == "task2") {
            echo task2($_GET["Task2Sum1"], $_GET["Task2Sum2"], $_GET["Task2Numbers"]);
        }
        ?>
    </p>
</div>

<div class="Task Task3">
    <h3>Task 3</h3>
    <p>Вывести на страницу список из 50 элементов вида:</p>
    <form action="index.php" method="get">
        <input type="hidden" name="action" value="task3">
        <input title="Rows count" type="number" step="1" min="0" name="Task3RowsCol" value="50">
        <input type="submit" title="Draw" value="Draw">
    </form>
    <ul>
        <?php
        if ($_GET["action"] == "task3") {
            echo task3($_GET["Task3RowsCol"]);
        }
        ?>
    </ul>
</div>

<div class="Task">
    <h3>Task 4</h3>
    <p>Шахматная доска</p>
    <form action="index.php" method="get">
        <input type="hidden" name="action" value="task4">
        <input title="Board Size" type="text" name="Task8boardSize" value="8x8" pattern="\d+x\d+">
        <input type="submit" title="Draw" value="Draw">
    </form>
    <div class="Task4__canvas">
        <?php
        if ($_GET["action"] == "task4") {
            echo task4($_GET["Task8boardSize"]);
        }
        ?>
    </div>
</div>
<div class="Task">
    <h3>Task 5</h3>
    <p>Найти сумму цифр введённого числа.</p>
    <form action="index.php" method="get">
        <input type="hidden" name="action" value="task5">
        <input title="Input value." type="text" value="12345" name="task5Value" pattern="[0-9,+-\.]+">
        <input title="Submit" type="submit">
    </form>
    <?php
    if ($_GET["action"] == "task5") {
        echo task5($_GET["task5Value"]);
    }
    ?>
</div>

<div class="Task">
    <h3>Task 6</h3>
    <p>​Сгенерировать массив рандомных целых чисел от 1 до 10, длинна массива 100. Убрать из массива повторы,
        отсортировать и ревертнуть.</p>
    <?php
    task6();
    ?>
</div>

</body>
</html>