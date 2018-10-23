<?php
define("ROOT_DIR", dirname(__DIR__) . DIRECTORY_SEPARATOR);
define("JSON_DIR", ROOT_DIR . "json" . DIRECTORY_SEPARATOR);
define("APP_DIR", ROOT_DIR . "app" . DIRECTORY_SEPARATOR);
define("TEMPLATE_DIR", ROOT_DIR . "template" . DIRECTORY_SEPARATOR);

return array(
    "voteJsonFile" => JSON_DIR . "vote.json",
    "voteClass" => APP_DIR . "Vote.php",
    "voteQuestionsTemplate" => TEMPLATE_DIR . "voteQuestions.php",
    "voteQuestionTemplate" => TEMPLATE_DIR . "voteQuestion.php",
    "voteErrorTemplate" => TEMPLATE_DIR . "voteError.php"
);