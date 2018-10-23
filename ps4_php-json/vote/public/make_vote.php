<?php
$config = require ".." . DIRECTORY_SEPARATOR . "config" . DIRECTORY_SEPARATOR . "config.php";
require($config["voteClass"]);
$vote = new Vote($config["voteJsonFile"]);
if (isset($_GET["question"])) {
    $vote->makeVote($_GET["question"]);
}
?><!DOCTYPE html>
<html>
<head>
    <title>Send vote.</title>
    <script src="https://code.jquery.com/jquery-3.3.1.js"
            integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
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
    </style>
</head>
<body>
</body>
<script>
    $(document).ready(() => {
        window.location.replace("result.php");
    });
</script>
</html>