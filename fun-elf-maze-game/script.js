const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const messages = document.getElementById('messages');
const timer = document.getElementById('timer');

let currentLevel = 1;
const maxLevel = 3;
let grid = [];
let stack = [];
let userX = 0;
let userY = 0;
let rows, cols;
let startTime, endTime;



let cellSize;

const levels = [
    { rows: 10, cols: 10 },
    { rows: 14, cols: 14 },
    { rows: 20, cols: 20 },
];

const userImg = new Image();
userImg.src = 'images/elf.png'; 

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = [true, true, true, true]; // top, right, bottom, left
        this.visited = false;
    }

    checkNeighbors() {
        let neighbors = [];
        let top = grid[index(this.x, this.y - 1)];
        let right = grid[index(this.x + 1, this.y)];
        let bottom = grid[index(this.x, this.y + 1)];
        let left = grid[index(this.x - 1, this.y)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
            let r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    draw() {
        let x = this.x * cellSize;
        let y = this.y * cellSize;

        if (this.x === 0 && this.y === 0) {
            ctx.fillStyle = "#98fb98"; // green for start cell
        } else if (this.x === cols - 1 && this.y === rows - 1) {
            ctx.fillStyle = "#ffd700"; // Golden color for end cell
        } else {
            ctx.fillStyle = "#fff"; 
        }
        ctx.fillRect(x, y, cellSize, cellSize);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        if (this.walls[0]) ctx.beginPath(), ctx.moveTo(x, y), ctx.lineTo(x + cellSize, y), ctx.stroke();
        if (this.walls[1]) ctx.beginPath(), ctx.moveTo(x + cellSize, y), ctx.lineTo(x + cellSize, y + cellSize), ctx.stroke();
        if (this.walls[2]) ctx.beginPath(), ctx.moveTo(x, y + cellSize), ctx.lineTo(x + cellSize, y + cellSize), ctx.stroke();
        if (this.walls[3]) ctx.beginPath(), ctx.moveTo(x, y), ctx.lineTo(x, y + cellSize), ctx.stroke();
    }
}

function index(x, y) {
    if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
    return x + y * cols;
}

function generateMaze() {
    rows = levels[currentLevel - 1].rows;
    cols = levels[currentLevel - 1].cols;
    grid = [];
    stack = [];
    userX = 0;
    userY = 0;
    cellSize = canvas.width / cols;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let cell = new Cell(x, y);
            grid.push(cell);
        }
    }

    let current = grid[0];
    current.visited = true;
    stack.push(current);

    while (stack.length > 0) {
        let next = current.checkNeighbors();
        if (next) {
            next.visited = true;

            stack.push(current);

            let x = current.x - next.x;
            if (x === 1) {
                current.walls[3] = false;
                next.walls[1] = false;
            } else if (x === -1) {
                current.walls[1] = false;
                next.walls[3] = false;
            }

            let y = current.y - next.y;
            if (y === 1) {
                current.walls[0] = false;
                next.walls[2] = false;
            } else if (y === -1) {
                current.walls[2] = false;
                next.walls[0] = false;
            }

            current = next;
        } else {
            current = stack.pop();
        }
    }

    drawMaze();
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let cell of grid) {
        cell.draw();
    }
    ctx.drawImage(userImg, userX * cellSize + 5, userY * cellSize + 5, cellSize - 10, cellSize - 10);
}

userImg.onload = function() {
    startGame();
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && userY > 0 && !grid[index(userX, userY)].walls[0]) userY--;
    if (event.key === 'ArrowRight' && userX < cols - 1 && !grid[index(userX, userY)].walls[1]) userX++;
    if (event.key === 'ArrowDown' && userY < rows - 1 && !grid[index(userX, userY)].walls[2]) userY++;
    if (event.key === 'ArrowLeft' && userX > 0 && !grid[index(userX, userY)].walls[3]) userX--;

    if (userX === cols - 1 && userY === rows - 1) {
        if (currentLevel < maxLevel) {
            currentLevel++;
            generateMaze();
        } else {
            clearInterval(timerId);
            const completionTime = Math.floor((120 - timeLeft));
            messages.innerHTML = `You helped ELi reach home on time! And completed all levels in ${completionTime} seconds!`;
            canvas.style.display = 'none';
        }
    } else {
        drawMaze();
    }
});

function startGame() {
    messages.innerHTML = "Uh-oh! Santa's workshop is in chaos!";
    canvas.style.display = 'none';
    document.body.addEventListener('click', firstClick, { once: true });
}

function firstClick() {
    messages.innerHTML = "This lost elf, Eli, can't seem to find his way back on Christmas Eve!";
    canvas.style.display = 'block';
    const storyImg = new Image();
    storyImg.src = 'elf.png';
    storyImg.onload = function() {
        ctx.drawImage(storyImg, 0, 0, canvas.width, canvas.height);
    };
    document.body.addEventListener('click', secondClick, { once: true });
}

function secondClick() {
    messages.innerHTML = "Eli is determined to reach Santa's Workshop, but he can't do it alone.";
    document.body.addEventListener('click', thirdClick, { once: true });
}

function thirdClick() {
    messages.innerHTML = "It is your mission to Guide Eli through the tricky mazes to reach there on time!";
    document.body.addEventListener('click', fourthClick, { once: true });
}

function fourthClick() {
    messages.innerHTML = "You will have 2 minutes to help Eli escape the 3 Mazes!";
    document.body.addEventListener('click', fifthClick, { once: true });
}

let timeLeft = 120; // 2 minutes in seconds
let timerId = null;

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            gameOver();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    messages.innerHTML = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function gameOver() {
    messages.innerHTML = "Time's up! Game Over!";
    canvas.style.display = 'none';
}

function fifthClick() {
    messages.innerHTML = "";
    canvas.style.display = 'block';
    generateMaze();
    startTimer(); // Start the timer when maze generates
}
