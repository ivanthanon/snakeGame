let foodX, foodY;
let snakeX = 5, snakeY = 10;
let directionX = 0, directionY = 0;
let bodySnake = [];
let classCSS;
let setIntervalId, htmlMarkup;

const scoreElement = document.querySelector(".score");
let score = 0;

const highScoreElement = document.querySelector(".high-score");
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High score: ${highScore}`

const playBoard = document.querySelector(".play-board")


const createRandomFood = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changeDirection = (event) => {
    if (event.key === "ArrowUp" && directionY == 0) {
        directionX = 0;
        directionY = -1;
    } else if (event.key === "ArrowDown" && directionY == 0) {
        directionX = 0;
        directionY = 1;
    } else if (event.key === "ArrowLeft" && directionX == 0) {
        directionX = -1;
        directionY = 0;
    } else if (event.key === "ArrowRight" && directionX == 0) {
        directionX = 1;
        directionY = 0;
    }
}

const calculateDirection = () => {
    snakeX += directionX;
    snakeY += directionY;
}

const checkLimits = () => {
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) return handleGameOver();
}

const addBodyToSnake = () => {
    bodySnake.push([snakeX, snakeY])
}

const handleGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game Over");
    location.reload();
}

const checkEat = () => {
    if (snakeX === foodX && snakeY === foodY) return true;
    else return false;
}

const incrementHighScore = () => {
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    highScoreElement.innerHTML = `High score: ${highScore}`
}

const incrementScore = () => {
    score++;
    scoreElement.innerHTML = `Score: ${score}`
    
}

const checkColision = (i) => {
    if (i !== 0 && bodySnake[0][1] === bodySnake[i][1] && bodySnake[0][0] === bodySnake[i][0]) {
        return handleGameOver();
    }
}

const growSnake = () => {
    for (let i = 0; i < bodySnake.length; i++) {
        if (i == 0) classCSS = "head";
        else classCSS = "snake"
        
        htmlMarkup += `<div class=${classCSS} style="grid-area: ${bodySnake[i][1]} / ${bodySnake[i][0]}"></div>`

        checkColision(i);
    }
}

const scrollSnake = () => {
    bodySnake.pop();
    bodySnake.unshift([snakeX, snakeY]);
}


const loopGame = () => {
    htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    calculateDirection();
    checkLimits();

    if (checkEat()) {
        createRandomFood()
        addBodyToSnake();
        incrementScore();
        incrementHighScore();
    }

    scrollSnake();
    growSnake();
    playBoard.innerHTML = htmlMarkup;
}

createRandomFood();
setIntervalId = setInterval(loopGame, 125);
document.addEventListener("keydown", changeDirection);