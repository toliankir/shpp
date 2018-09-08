<?php
function task1($firstNumber, $secondNumber)
{
    $sum = 0;
    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        $sum += $i;
    }
    return $sum;
}

function task2($firstNumber, $secondNumber, $numArray)
{
    $sum = 0;
    $num_array = explode(",", $numArray);
    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        if (in_array(((string)$i)[strlen((string)$i) - 1], $num_array)) {
            $sum += $i;
        }
    }
    echo "<p>" . $sum . "</p>";
}

function task3($rowsCol)
{
    $result = "";
    for ($i = 1; $i <= $rowsCol; $i++) {
        $result = $result . "<li>" . str_repeat("*", $i) . "</li>\n";
    }
    return $result;
}


function task4($boardSize)
{
    preg_match('/(\d+)x(\d+)/', $boardSize, $matches);
    $amount = $matches[1] * $matches[2];
    $marked = false;
    $result = "";
    for ($i = 1; $i <= $amount; $i++) {

        $result = $result . "<div class='Task4__item " . ($marked ? "Task4__marked" : "") . "'></div>\n";
        $marked = !$marked;
        if ($i % $matches[1] == 0) {
            if ($matches[1] % 2 == 0) $marked = !$marked;
            $result = $result . "<br>\n";
        }
    }
    return $result;
}

function task5($inNumber){

        if (preg_match("/^[0-9-+.,]*$/", $inNumber)) {
            $str = preg_replace("/[-+.,]/", "", $inNumber);
            $sum = 0;
            for ($i = 0; $i < strlen($str); $i++) {
                $sum += $str[$i];
            }
            return $sum;
        } else {
            return "Eneter number please";
        }
}

function task6() {
    for ($i = 0; $i < 100; $i++) {
        $resultArray[] = mt_rand(0, 10);
    }
    echo "<p>Source array: " . implode(", ", $resultArray) . "</p>";
    $uniqueArray = array_unique($resultArray);
    echo "<p>Array with unique values: " . implode(", ", $uniqueArray) . "</p>";
    echo "<p>Reversed array with unique values: " . implode(", ", array_reverse($uniqueArray)) . "</p>";
}
?>