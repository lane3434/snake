const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20;

let interval;
let gameRunning = false;
let snake = [{ x: 10, y: 10 }];
let dx = 1;
let dy = 0;
let food = { x: 15, y: 15 };
let score = 0;
let speed = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function startGame() {
    gameRunning = true;
    score = 0;
    dx = 1;
    dy = 0;
    document.getElementById('mainMenu').style.display = 'none';
    resizeCanvas();
    interval = setInterval(gameLoop, speed);
    window.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    const key = event.key;
    if (key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    } else if (key === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (key === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * (canvas.width / tileSize));
        food.y = Math.floor(Math.random() * (canvas.height / tileSize));
        score++; // Increment score when food is eaten
        clearInterval(interval);
        speed -= 5; // Increase speed
        interval = setInterval(gameLoop, speed);
    } else {
        snake.pop();
    }

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    // Check for collision with walls or itself
    if (
        head.x < 0 || head.x >= canvas.width / tileSize ||
        head.y < 0 || head.y >= canvas.height / tileSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(interval);
        alert(`Game Over! Score: ${score}`);
        gameRunning = false;
        document.getElementById('mainMenu').style.display = 'flex';
        window.removeEventListener('keydown', handleKeyPress);
    }
}
