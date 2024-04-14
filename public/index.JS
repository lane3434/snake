const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Size of each tile in the grid
const tileSize = 20;

// Initial snake position and attributes
let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;

// Initial food position
let food = { x: 15, y: 15 };

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * (canvas.width / tileSize));
        food.y = Math.floor(Math.random() * (canvas.height / tileSize));
    } else {
        snake.pop();
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    // Check for collision with walls or itself
    if (
        head.x < 0 || head.x >= canvas.width / tileSize ||
        head.y < 0 || head.y >= canvas.height / tileSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(interval);
        alert('Game Over!');
    }
}

// Handle key presses
document.addEventListener('keydown', event => {
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
});

// Start game loop
const interval = setInterval(gameLoop, 100);
