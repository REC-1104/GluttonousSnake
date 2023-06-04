const Game = document.querySelector('.game');
const frame = document.querySelector('.box');
const scoreBoard = document.querySelector('.score');
let highScoreCount = document.querySelector('.high_score');
const controls = document.querySelectorAll('.control i');

let gameOver = false;
let foodX  ,foodY;
let body = [];
let snakeX =5 ,snakeY = 10;
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score =0;
let highScore = localStorage.getItem('high_score') || 0;
textContent = `High Score : ${highScore}`;

const changeFoodPosition = () => {
    foodX= Math.floor(Math.random()*30) + 1;
    foodY= Math.floor(Math.random()*30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
}

const restart = () => {
    location.reload();
    document.querySelector("#lost").style.display = "none";
}

const lost = () => {
    document.querySelector("#lost").style.display = "flex";
  };

const changeDirection = (e) => {
      if((e.key==="ArrowUp" || e.key==="w")&& velocityY!=1)
      {
         velocityX = 0;
         velocityY = -1;
      }
      else if((e.key==="ArrowDown" || e.key==="s")&& velocityY!=-1)
      {
        velocityX = 0;
         velocityY = 1;
      }
      else if((e.key==="ArrowRight" || e.key==="d")&&velocityX!=-1)
      {
        velocityX = 1;
         velocityY = 0;
      }
      else if((e.key==="ArrowLeft" || e.key==="a")&&velocityX!=1)
      {
        velocityX = -1;
         velocityY = 0;
      } 
}

controls.forEach(key => {
    key.addEventListener("click",()=>(changeDirection({key : key.dataset.key})));
})

const initGame = () => {

  if(gameOver) {return handleGameOver();};

  let Markup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
   Markup += `<div class="snake" style="grid-area:${snakeY}/${snakeX}"></div>`;

  
  
  if(snakeX===foodX && snakeY===foodY){
    changeFoodPosition();
    body.push([foodX,foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.getItem("high_score", highScore);
    highScoreCount.textContent = `High Score : ${highScore}`;
    scoreBoard.    textContent = `Score : ${score}`;
  }

  for(let i=body.length-1; i>0 ; i--) {
    body[i]=body[i-1];
  }

  body[0] = [snakeX,snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  if(snakeX<=0 || snakeY>30 || snakeX>30 || snakeY <=0){
    frame.classList.add('shake');
    gameOver=true;
    lost();
  }
  
  for(let i=0; i<body.length ; i++) {
    Markup += `<div class="snake" style="grid-area: ${body[i][1]}/${body[i][0]}"></div>`;
    if(i!==0 && body[0][1]===body[i][1] && body[0][0]===body[i][0]){
        frame.classList.add('shake');
       lost();
       gameOver=true;
    }
  }

  Game.innerHTML = Markup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection)
