//  Values & constant
const eatfoodSound = new Audio("Music/eat.mp3");
const gameoverSound = new Audio("Music/gameover.mp3");
let box = document.querySelector(".box");
let scoreElement = document.querySelector(".score");
let highscoreElement = document.querySelector(".high-score");
let newGame = document.querySelector("#new-game");
let popUp = document.querySelector(".popup");

let inputDirection = { x: 0, y: 0 };
let speed = 5;
let score = 0;
let highScore = 0;
let lastpaintTime = 0;

// random number
function randomNum() {
  return Math.round(Math.random() * 20);
}

// food location
let snakeArr = [{ x: randomNum(), y: randomNum() }];
let food = { x: randomNum(), y: randomNum() };

// fuctions of game
function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - lastpaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastpaintTime = currentTime;
  gameEngine();
}

// colliding fuctions of snake
function isCollide(snakeArr) {
  // snake is not colliding with itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  // if snake collide with wall
  if (
    snakeArr[0].x < 0 ||
    snakeArr[0].x > 20 ||
    snakeArr[0].y < 0 ||
    snakeArr[0].y > 20
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  // updating snake position
  if (isCollide(snakeArr)) {
    gameoverSound.play();
    inputDirection = { x: 0, y: 0 };
    popupFun();
    snakeArr = [{ x: 13, y: 13 }];
    score = 0;
  }
  // if snake eat the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });
    food = { x: randomNum(), y: randomNum() };
    eatfoodSound.play();
    score++;
    scoreElement.innerHTML = score;
  }

  // to move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].y += inputDirection.y;
  snakeArr[0].x += inputDirection.x;

  //   Display snake and food
  //   Displaying snake in box
  box.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.style.gridRowStart = e.y;
    if (index === 0) {
      snakeElement.classList.add("snakeHead");
    } else {
      snakeElement.classList.add("snake");
    }
    box.appendChild(snakeElement);
  });
  //   displaying food
  let foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  box.appendChild(foodElement);
}

// popup function
function popupFun() {
  popUp.classList.remove("hide");
  let message = document.querySelector(" #message");
  message.innerHTML = `&#128534; Game Over`;
}

// start
window.requestAnimationFrame(main);

// logic of snake game
newGame.addEventListener("click", () => {
  popUp.classList.add("hide");
});

window.addEventListener("keydown", (e) => {
  inputDirection = { x: 0, y: 1 };
  // start the game
  switch (e.key) {
    case "ArrowUp":
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowDown":
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowLeft":
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    default:
      break;
  }
});
