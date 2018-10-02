<?php
require("vote.php");
$vote = new Vote("vote.dat");
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
    <?php
    $vote->printQuestions();
    ?>
</div>
</body>
<script type="text/javascript" src="script.js">
</script>
</html>