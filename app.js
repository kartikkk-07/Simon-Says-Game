let gameSeq = [];
let userSeq = [];
let highScore = 0;
let score;

let btns = ["red", "blue", "yellow", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false) {
        console.log("Game started");
        started = true;

        score = 0;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 150);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIndex);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        // console.log("same value.");
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            score++;
        }
    } else {
        if(level - 1 == -1){
            level = 0;
        } else {
            level = level - 1;
        }
        h2.innerHTML = `Game over! Your score was <b>${level}</b><br>Press any key to restart the game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "rgb(157, 255, 186)";
        }, 150);
        if(highScore < score){
            highScore = score;
        }
        document.getElementById("high-score").innerText = `High Score: ${highScore}`;
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}