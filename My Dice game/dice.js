var randomNumber1 = Math.floor(Math.random() * 6) + 1; // to create number between 1-6

var randomDiceImg = "dice" + randomNumber1 + ".png";  //to change the image after the refresh

var randomImagesSource = "images/" + randomDiceImg; //  for inamges as image/dice1.png - image/dice6.png

 document.querySelectorAll("img")[0].setAttribute("src", randomImagesSource); // select the specific image


var randomNumber2  = Math.floor(Math.random() * 6) + 1;
var randomDiceImg2 = "dice" + randomNumber2 + ".png";
var randomImagesSource2 = "images/" + randomDiceImg2;
 document.querySelectorAll("img")[1].setAttribute("src", randomImagesSource2); 


// if player 1 wins the match 
if(randomNumber1>randomNumber2){
    document.querySelector("h1").innerHTML="🚩Player 1 Wins!";
}   
else if (randomNumber1<randomNumber2){
    document.querySelector("h1").innerHTML="Player 2 wins!🚩";
}
else {
    document.querySelector("h1").innerHTML="Draw!";
}