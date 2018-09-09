<?php
require("vote.php");
$voteClient = new VoteClient("vote.dat");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Vote</title>
    <script src="https://code.jquery.com/jquery-3.3.1.js"
            integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

</head>
<body>

<div class="vote">
    <div class="vote__title"><?php $voteClient->printTitle(); ?></div>
    <div class="vote__resetStatus"><i id="resetVote" class="fas fa-times-circle"></i></div>
    <form method="get" action="make_vote.php">
        <ul class="vote__questionList">
            <?php
            $voteClient->printQuestions();
            ?>
        </ul>
        <input class="vote__input" title="Make vote" type="button" value="Make vote">
    </form>
    <div class="vote__link">
        <a href="result.php">Show results.</a>
    </div>
</div>
</body>
<script type="text/javascript" src="script.js">
</script>
</html>