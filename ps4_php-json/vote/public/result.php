<?php
$config = require ".." . DIRECTORY_SEPARATOR . "config" . DIRECTORY_SEPARATOR . "config.php";
require($config["voteClass"]);
$vote = new Vote($config["voteJsonFile"]);
?><!DOCTYPE html>
<html>
<head>
    <title>Vote result.</title>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            let data = google.visualization.arrayToDataTable([
                <?php $vote->printResult(); ?>
            ]);

            let options = {
                title: 'Result: <?php $vote->printTitle(); ?>',
                backgroundColor: '#22a6b3',
                titleTextStyle: {
                    color: '#eee',
                    fontName: 'sans-serif',
                    fontSize: 20,
                    bold: true,
                    italic: false
                }
            };

            let chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);
        }
    </script>
    <style>
        body {
            background-color: #22a6b3;
            text-align: center;
        }

        h3 {
            color: #eee;
            font-family: sans-serif;
            font-size: 20px;
        }

        #piechart {
            margin-left: auto;
            margin-right: auto;
        }

        a {
            text-decoration: underline;
            font-family: sans-serif;
            font-size: 1rem;
            color: #eee;
            font-weight: bold;
        }
    </style>
</head>
<body>
<h3>
    <?php
    if (isset($_GET["question"])) {
        if ($vote->getQuestionById($_GET["question"])) {
            echo "You vote for " . $vote->getQuestionById($_GET["question"]);
        } else {
            echo "Something went wrong.";
        }

    }
    ?>
</h3>
<div id="piechart" style="width: 900px; height: 500px;"></div>
<a href="index.php">Go back.</a>
</body>
</html>