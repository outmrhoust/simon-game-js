var userClickedPattern = []
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var l = 0;
$(document).on("keydown", function(e) {
  if (!started) {
    nextSequence();
    started = true;
  }
});




$(".btn").on("click", function(event) {
  if (started === true){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(event.target.id);
  playSound(event.target.id);
  for (var i = 0; i <= (userClickedPattern.length - 1); i++) {
    checkAnswer(i);
  }
}

});


function nextSequence() {
  level = level + 1;
  $("#level-title").text("level" + " " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function() {
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  }, 500)
  setTimeout(function() {
    playSound(randomChosenColour);
  }, 500)
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)

}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
function gameOver() {
  $(document.body).addClass("game-over")
  setTimeout(function() {
    $(document.body).removeClass("game-over")
  }, 200)

}


function checkAnswer(i) {
  if (userClickedPattern[i] === gamePattern[i] && userClickedPattern.length < gamePattern.length) {

  } else if (JSON.stringify(userClickedPattern)=== JSON.stringify(gamePattern)) {
    nextSequence();
    userClickedPattern = [];
  } else if (userClickedPattern[i] !== gamePattern[i]) {
    level=0;
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false;
    gameOver();
    playSound("wrong")
    userClickedPattern = [];
    gamePattern = [];
  }
}
