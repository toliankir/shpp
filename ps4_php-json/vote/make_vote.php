<?php
require("vote.php");
const VOTE_FILE = "vote.dat";
$voteServer = new VoteServer(VOTE_FILE);
if (isset($_GET["question"])) {
    $voteServer->makeVote($_GET["question"]);
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