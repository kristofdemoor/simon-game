"use stict";

let randomNumber;
const buttonColors = ["red", "blue", "green", "yellow"];
let randomChosenColor;
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let index = 0;

// Start game when pressing A key
$(document).keypress(function (e) {
    if (!started) {
        if (e.key === "a") {
            // Start sequence
            nextSequence();
            levelUp();
            started = true;
        }
    }
});


// User button click
$(".btn").click(function () {

    // Add button to user pattern 
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // Play sound
    playSound(userChosenColor);

    // Animate button
    animatePress(userChosenColor);

    // Check answer
    checkAnswer(level);
});


// Start next sequence 
function nextSequence() {
    // Get random number
    randomNumber = Math.floor(Math.random() * 4);

    // Select random color
    randomChosenColor = buttonColors[randomNumber];

    // Add selected color to game pattern
    gamePattern.push(randomChosenColor);

    // Play sound
    playSound(randomChosenColor);

    // Animate the button 
    animatePress(randomChosenColor);
};

function playSound(name) {
    const sound = new Audio("./sounds/" + name + ".mp3");
    // const sound = new Audio("./sounds/blue.mp3");
    sound.play();
}

function animatePress(currentColor) {
    // Add pressed class to btn with currentColor id
    const $btn = $("#" + currentColor).addClass("pressed");
    // Remove class after 100 ms
    setTimeout(() => {
        $btn.removeClass("pressed");
    }, 150);
}

function levelUp() {
    level++;
    // Adjust h1 text
    setLevelText();
}

function setLevelText() {
    $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
    //DEBUG
    console.log("Index:" + index);
    console.log("userClicked:" + userClickedPattern);
    console.log("gamePattern: " + gamePattern);

    if (userClickedPattern[index] === gamePattern[index]) {
        console.log("Success");
        index++;

    }
    else {
        console.log("Wrong");
        //Game Over
        gameOver();


    }
    if (index === currentLevel) {
        setTimeout(function () {
            userClickedPattern = [];
            nextSequence();
            levelUp();
            index = 0;
        }, 300);

    }
}

function gameOver() {
    // Play Game Over sound
    playSound("wrong");
    // Show red background for 200 ms
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    // Display Game Over 
    $("#level-title").text("Game Over");
    // Wait 2 seconds and then display Press A Key to Start
    setTimeout(() => {
        $("#level-title").text("Press A Key to Start");
    }, 2000);
    // Reset game variables
    reset();
}

function reset() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
    index = 0;


}



