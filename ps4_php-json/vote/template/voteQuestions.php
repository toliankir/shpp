<div class="vote__title"><?php echo $this->voteData["title"]; ?></div>
<div class="vote__resetStatus"><i id="resetVote" class="fas fa-times-circle"></i></div>
<form method="get" action="make_vote.php">
    <ul class="vote__questionList"><?php echo $voteList; ?></ul>
    <input class="vote__input" title="Make vote" type="button" value="Make vote">
</form>
<div class="vote__link">
    <a href="result.php">Show results.</a>
</div>