userClickedPattern = []
gamePattern = []
buttonColours = ['red', 'blue', 'green', 'yellow']
var started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('h1').html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}

// when user clicks the btn
$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

$(document).keypress(function(event) {
  // alert(event.key)
  if (!started) {
    started = true;
    level = 0;
    nextSequence();
  }
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed')

  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);

}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length){

      console.log("success");
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong")
    $('body').addClass('game-over')
    setTimeout(function(){
      $('body').removeClass('game-over')
    },200)
    $('h1').html("Game Over, Press Any Key to Restart")
    startOver()
  }
}

function startOver(){
  level = 0
  gamePattern = []
  started = false

}
