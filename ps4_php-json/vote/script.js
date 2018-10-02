$(".vote__input").click(() => {
    const question = $(".vote input[name='question']:checked")[0];
    if (question) {
        if (localStorage.getItem("voted") !== "true") {
            localStorage.setItem("voted", "true");
            window.location.replace(`make_vote.php?question=${question.value}`);
        } else {
            alert("You already voted.");
        }
    } else {
        alert("Make your choice.");
    }
});

$('.vote label').on('click', (event) => {
    $(event.target).closest('li').find('input').prop('checked', true);
    // console.log($(event.target).closest('li'));
});

$("#resetVote").click(() => {
    $("#resetVote").css("visibility", "hidden");
    localStorage.removeItem("voted");
});

function initVote() {
    if (localStorage.getItem("voted") === "true") {
        $("#resetVote").css("visibility", "visible");
    }
}

$(document).ready(() => {
    initVote();
});
