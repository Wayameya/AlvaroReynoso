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
    // Each color has a corresponding sound file
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    // Add the pressed class to the button
    $("#" + color).addClass("pressed");

    // Remove the pressed class after 100ms
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
    // Check if the most recent user's click matches the corresponding game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // Correct answer
        if (userClickedPattern.length === gamePattern.length) {
            // User has completed the sequence, proceed to the next sequence
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        // Incorrect answer
        playSound("wrong");

        // Add a red flash to the <body> to indicate game over
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Reset the game
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Restart the game
        startOver();
    }
}

// Function to restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}