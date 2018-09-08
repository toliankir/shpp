<!DOCTYPE html>
<html>
<head>
    <title>Warp up ps4</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<div class="Task">
    <h3>Task 1</h3>
    <p>Посчитать сумму чисел от -1000 до 1000</p>
    <?php
    $start = -1000;
    $end = 1000;
    $sum = 0;
    for ($i = $start; $i <= $end; $i++) {
        $sum += $i;
    }
    echo "<p>" . $sum . "</p>";
    ?>
</div>
<div class="Task">
    <h3>Task 2</h3>
    <p>Посчитать сумму чисел от -1000 до 1000, суммируя только числа которые заканчиваются на 2,3, и 7</p>
    <?php

    $start = -1000;
    $end = 1000;
    $sum = 0;
    $num_array = ["2", "3", "7"];
    for ($i = $start; $i <= $end; $i++) {
        if (in_array(((string)$i)[strlen((string)$i) - 1], $num_array)) {
            $sum += $i;
        }
    }
    echo "<p>" . $sum . "</p>";
    ?>
</div>
<div class="Task Task3">
    <h3>Task 3</h3>
    <p>Вывести на страницу список из 50 элементов вида:</p>
    <ul>
        <?php
        $num = 50;

        for ($i = 1; $i <= $num; $i++) {
            echo "<li>" . implode("", array_fill(0, $i, "*")) . "</li>\n";
        }

        ?>
    </ul>
</div>
<div class="Task">
    <h3>Task 4</h3>
    <p>Шахматная доска</p>
    <div class="Task4__canvas">
        <?php
        $w = 8;
        $h = 8;
        $marked = false;
        for ($i = 0; $i < $w; $i++) {
            for ($i2 = 0; $i2 < $h; $i2++) {
                echo "<div class='Task4__item " . ($marked ? "Task4__marked" : "") . "'></div>";
                $marked = !$marked;
            }
            if ($w % 2 == 0) $marked = !$marked;
            echo "<br>";
        }
        ?>
    </div>
</div>
<div class="Task">
    <h3>Task 5</h3>
    <p>Найти сумму цифр введённого числа.</p>
    <form action="index.php" method="GET">
        <input title="Input value." type="text" name="task5Value" value="<?php
        if (!empty($_GET["task5Value"])) {
            echo $_GET["task5Value"];
        }else {
            echo "12345";
        }
        ?>">
        <input title="Submit" type="submit">
    </form>
    <?php
    if (!empty($_GET["task5Value"])) {
        if (preg_match("/^[0-9-+.,]*$/", $_GET["task5Value"])) {
            $str = preg_replace("/[-+.,]/", "", $_GET["task5Value"]);
            $sum = 0;
            for ($i=0; $i<strlen($str);$i++) {
                $sum += $str[$i];
            }
            echo "<p>Sum: ".$sum."</p>";
        } else {
            echo "<p>Eneter number please</p>";
        }
    } else {
        echo "<p>Eneter number</p>";
    }
    ?>
</div>
<div class="Task">
    <h3>Task 6</h3>
    <p>​Сгенерировать массив рандомных целых чисел от 1 до 10, длинна массива 100. Убрать из массива повторы,
        отсортировать и ревертнуть.</p>
    <?php
    for ($i = 0; $i < 100; $i++) {
        $resultArray[] = mt_rand(0, 10);
    }
    echo "<p>Source array: " . implode(", ", $resultArray) . "</p>";
    $uniqueArray = array_unique($resultArray);
    echo "<p>Array with unique values: " . implode(", ", $uniqueArray) . "</p>";
    echo "<p>Reversed array with unique values: " . implode(", ", array_reverse($uniqueArray)) . "</p>";
    ?>
</div>
</body>
</html>