<?php
require("vote.php");
const VOTE_FILE = "vote.dat";
$voteClient = new VoteClient(VOTE_FILE);
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
                <?php $voteClient->printResult(); ?>
            ]);

            let options = {
                title: 'Result: <?php $voteClient->printTitle(); ?>',
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

        a{
            text-decoration: underline;
            font-family: sans-serif;
            font-size: 1rem;
            color: #eee;
            font-weight: bold;
        }
    </style>
</head>
<body>
<?php

if (isset($_GET["question"])) {
    if ($voteClient->getQuestionById($_GET["question"])) {
        echo "<h3>You vote for " . $voteClient->getQuestionById($_GET["question"]) . "</h3>";
    } else {
        echo "<h3>Something went wrong.</h3>";
    }

}
?>
<div id="piechart" style="width: 900px; height: 500px;"></div>
<a href="index.php">Go back.</a>
</body>
</html>