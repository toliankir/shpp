$(".vote__input").click((event) => {
    if ($(".vote input[name='question']:checked")[0]) {
        if (localStorage.getItem("voted") !== "true") {
            localStorage.setItem("voted", "true");
            window.location.replace(`make_vote.php?question=${$(".vote input[name='question']:checked")[0].value}`);
        } else {
            alert("You already voted.");
        }
    } else {
        alert("Make your choice.");
    }
});

$("#resetVote").click((event) => {
    $("#resetVote").css("visibility", "hidden");
    localStorage.removeItem("voted");
});

function initVote() {
    if (localStorage.getItem("voted") === "true") {
        console.log($("#resetVote"));
        $("#resetVote").css("visibility", "visible");
    }
}

$(document).ready(() => {
    initVote();
});
