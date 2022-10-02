//Logic :
// 1=rock , 2=paper , 3=seasor
// p = c : tie ; p=c+1 : p win ; c=p+1 : c wins; p3&c1 : c wins ; p1&c3 : p wins 

const pi = document.getElementById('Uchoice');
const bi = document.getElementById('Bchoice');
let sc=0;

function playP(){
    if(document.getElementById('Uchoice').classList != "UCactive"){
        document.getElementById('Uchoice').classList.add("UCactive");

        setTimeout(function(){
            document.getElementById('Uchoice').classList.remove("UCactive");
        }
        , 300);
    }
}

function playB(){
    if(document.getElementById('Bchoice').classList != "BCactive"){
        document.getElementById('Bchoice').classList.add("BCactive");

        setTimeout(function(){
            document.getElementById('Bchoice').classList.remove("BCactive");
        }
        , 300);
    }
}

function rps(x){
    console.log("playing...")
    let p = x;
    let c;
    c = Math.floor(Math.random()*3)+1;
    console.log("p="+p+" c="+c);

    if(p==1){
        document.getElementById('Uchoice').style.backgroundImage = 'url("./assets/roch.png")';
    }
    else if(p==2){
        document.getElementById('Uchoice').style.backgroundImage = 'url("./assets/paperh.png")';
    }
    else if(p==3){
        document.getElementById('Uchoice').style.backgroundImage = 'url("./assets/scissorh.png")';
    }

    if(c==1){
        document.getElementById('Bchoice').style.backgroundImage = 'url("./assets/roco.png")';
    }
    else if(c==2){
        document.getElementById('Bchoice').style.backgroundImage = 'url("./assets/papero.png")';
    }
    else if(c==3){
        document.getElementById('Bchoice').style.backgroundImage = 'url("./assets/scissoro.png")';
    }

    playP();
    playB();

    if(p==c){
        document.getElementById('res').innerHTML = "Its a Tie :/";
        console.log("Tie");
    }
    else if(p==c+1){
        document.getElementById('res').innerHTML = "Yay You Won the round :D";
        sc++;
        document.getElementById('score').innerHTML = "SCORE : "+sc;
        console.log("You Won");
    }
    else if(c==p+1){
        document.getElementById('res').innerHTML = "Oops You Lost the round :(";
        sc--;
        document.getElementById('score').innerHTML = "SCORE : "+sc;
        console.log("You Lost");
    }
    else if(p==3 && c==1){
        document.getElementById('res').innerHTML = "Oops You Lost the round :(";
        sc--;
        document.getElementById('score').innerHTML = "SCORE : "+sc;
        console.log("You Lost");
    }
    else if(p==1 && c==3){
        document.getElementById('res').innerHTML = "Yay You Won the round :D";
        sc++;
        document.getElementById('score').innerHTML = "SCORE : "+sc;
        console.log("You Won");
    }

    if(sc>1){
        document.getElementById('botty').src= "./assets/botty3.png";
    }
    else if(sc<-1){
        document.getElementById('botty').src= "./assets/botty.png";
    }
    else{
        document.getElementById('botty').src= "./assets/botty2.png";
    }
}

function ocRock(){
    rps(1);
}

function ocPaper(){
    rps(2);
}

function ocScissors(){
    rps(3);
}

