<?php
$rootDir = dirname(__DIR__) . DIRECTORY_SEPARATOR;
$jsonDir = $rootDir. "json" . DIRECTORY_SEPARATOR;
$appDir = $rootDir . "app" . DIRECTORY_SEPARATOR;
$templateDir = $rootDir . "template" . DIRECTORY_SEPARATOR;

return array(
    "voteJsonFile" => $jsonDir . "vote.json",
    "voteClass" => $appDir . "Vote.php",
    "voteQuestionsTemplate" => $templateDir . "voteQuestions.php",
    "voteQuestionTemplate" => $templateDir . "voteQuestion.php",
    "voteErrorTemplate" => $templateDir . "voteError.php"
);