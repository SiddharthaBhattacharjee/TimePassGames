
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//selecting objects
//$("any css selector")
//changing css
//$("any css selector").css("propertyname for ex color","property value for ex yello")
//changing text
//$("any css selector").text("text that we want to change");
//$("any cass selector").html("any html tag with text say <em> bye </em>")
//changing attributes
//$("any css selector").attr("attribute_name","attr value")
//adding event listener (in here the event listener is added  to all the elments with that particular css selector at once and we need not add any for loop for that)
// $("any css selector").on("any event listener say keydown",call back function)
//adding elements on the fly with before,after,prepend,append 
//$("any css selector").before("<button>new</button>");

//check animate methods in jquery or mdn webdocs 


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");
      },200);
      startOver();
    }
    


}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $("h1").text("press any key to restart");

}