var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var highestLevel = [];

if ($(window).width() <= 768) {
$("h1").text("Press the Start Game Key to Start");
$("#start-button").show();
}

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

$(document).keypress(function(){
    if ($(window).width() > 768){
    if (level === 0) {
        setTimeout(function() {
            nextSequence();
        }, 100); 
    }
}});

$("#start-button").on("click", function () {
    if (level === 0) {
        $("#start-button").hide(); 
        nextSequence();
    }
});


function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    if ($(window).width() <= 768) {
        $("#start-button").show();
    }
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        

        
    } else {
        highestLevel.push(level);
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        if ($(window).width() <= 768) {
            $("#level-title").text("Game Over, Press the Start Game Button to Restart");
        }
        else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        }
        if (level > 0) {
        $("h2").text("Highest Level Achieved: " + (Math.max(...highestLevel)-1));
        }
        startOver();
    
    }
}
