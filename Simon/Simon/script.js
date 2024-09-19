var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    console.log("Random number: " + randomNumber);
    console.log("Chosen color: " + randomChosenColor);
    console.log("Current game pattern: " + gamePattern);

    return randomNumber;
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("User clicked: " + userChosenColor);
    console.log("User's sequence: " + userClickedPattern);;

    setTimeout(function() {
        checkAnswer(userClickedPattern.length - 1);
    }, 100);

});

$(document).keydown(function() {
    nextSequence();
});

function checkAnswer(currentLevel) {
    // Log the user's pattern and the game pattern for debugging
    console.log("Checking answer for level: " + currentLevel);
    console.log("User's pattern: " + userClickedPattern);
    console.log("Game pattern: " + gamePattern);

    // Check if the most recent user's click matches the corresponding game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct so far!");

        // Check if the user has finished the whole sequence
        if (userClickedPattern.length === gamePattern.length) {
            console.log("Sequence complete!");
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong answer!");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}