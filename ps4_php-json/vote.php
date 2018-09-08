<?php

class Vote
{
    private $voteFile;
    private $voteData;

    /**
     * Vote constructor.
     * @param $voteFile file name of vote json file;
     */
    public function __construct($voteFile)
    {
        $this->voteFile = $voteFile;
        $this->readVoteFile();
    }

    /**
     * Read json file and save json data in local object variable.
     */
    private function readVoteFile()
    {
        $this->voteData = json_decode(file_get_contents($this->voteFile), true);
    }

    /**
     * Save vote results to file in json format.
     */
    private function saveVoteFile()
    {
        file_put_contents($this->voteFile, json_encode($this->voteData));
    }

    /**
     * Print title of the vote.
     */
    public function printTitle()
    {
        echo $this->voteData["title"];
    }

    /**
     * Print vote questions in html list format.
     */
    public function printQuestions()
    {
        foreach ($this->voteData["questions"] as $key => $value) {
            echo("<li><input title=\"" . $value .
                "\" type=\"radio\" name=\"question\" value=\"" . $key .
                "\">" . $value . "</li>\n");
        }
    }

    /**
     * Increment question counter.
     * @param $id Id of question
     */
    public function makeVote($id)
    {
        if (array_key_exists($id, $this->voteData["results"])) {
            $this->voteData["results"][$id]++;
            $this->saveVoteFile();
        }
    }

    /**
     * Return question by its id, if id dose not present return false;
     * @param $id - question id.
     * @return bool - Return question or false
     */
    public function getQuestionById($id)
    {
        if ($id < sizeof($this->voteData["questions"])) {
            return $this->voteData["questions"][$id];
        }
        return false;
    }

    /**
     * Print vote result for Google chart.
     */
    public function printResult()
    {
        $resultArray[] = "['Question', 'Votes']";
        foreach ($this->voteData["questions"] as $key => $value) {
            $resultArray[] = "['" . $value . " - " . $this->voteData["results"][$key] . "', " . $this->voteData["results"][$key] . "]";
        }
        echo implode(",\n", $resultArray);
    }
}

?>