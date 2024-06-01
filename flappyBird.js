
// //* board

// let board;
// let boardWidth = 360;
// let boardHeight = 640;
// let context;


// //* bird

// let birdWidth = 34; //* width/height ratio = 408/228 = 17/12
// let birdHeight = 24;
// let birdX = boardWidth / 8;
// let birdY = boardHeight / 2;
// let birdImg;

// let bird = {
//     x: birdX,
//     y: birdY,
//     width: birdWidth,
//     height: birdHeight
// }


// //* pipes
// let pipeArray = [];
// let pipWidth = 64; //* width/height ratio = 384/3072 = 1/8
// let pipeHeight = 512;
// let pipeX = boardWidth;
// let pipeY = 0;

// let topPipeImg;
// let bottomPipeImg;


// //* physics
// let velocityX = -1.5; //* pipes moving left speed
// let velocityY = 0 //* bird jump speed
// let gravity = 0.25;


// let gameOver = false;
// let score = 0;


// window.onload = function () {
//     board = document.getElementById("board");
//     board.width = boardWidth;
//     board.height = boardHeight;
//     context = board.getContext("2d"); //* used for drawing on the board

//     //* draw flappy bird
//     // context.fillStyle = "green";
//     // context.fillRect(bird.x, bird.y, bird.width, bird.height);

//     //* load images
//     birdImg = new Image();
//     birdImg.src = "./flappybird.png";
//     birdImg.onload = function () {
//         context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
//     }

//     topPipeImg = new Image();
//     topPipeImg.src = "./toppipe.png";

//     bottomPipeImg = new Image();
//     bottomPipeImg.src = "./bottompipe.png";

//     requestAnimationFrame(update);
//     setInterval(placePipes, 1000); //* every 1 seconds

//     document.addEventListener("keydown", moveBird);

//     //* add touch event listener for mobile devices
//     document.addEventListener("touchstart", moveBird);
// }


// function update() {
//     requestAnimationFrame(update);
//     if (gameOver) {
//         return;
//     }
//     context.clearRect(0, 0, board.width, board.height);

//     //* bird
//     velocityY += gravity;
//     // bird.y += velocityY;
//     bird.y = Math.max(bird.y + velocityY, 0); //* apply gravity to current bird.y, limit the bird.y to top of the canvas
//     context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

//     if (bird.y > board.height) {
//         gameOver = true;
//     }

//     //* pipes
//     for (let i = 0; i < pipeArray.length; i++) {
//         let pipe = pipeArray[i];
//         pipe.x += velocityX;
//         context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

//         if (!pipe.passed && bird.x > pipe.x + pipe.width) {
//             score += 0.5; //* 0.5 because there are 2 pipes 
//             pipe.passed = true;
//         }

//         if (detectCollision(bird, pipe)) {
//             gameOver = true;
//         }
//     }

//     //* clear pipes
//     while (pipeArray.length > 0 && pipeArray[0].x < 1 - pipWidth) {
//         pipeArray.shift(); //* removes first element from the array
//     }

//     //* score
//     context.fillStyle = "white";
//     context.font = "bold 25px sans-serif";
//     context.fillText(score, 20, 45);

//     //* game over
//     if (gameOver) {
//         context.fillText("GAME OVER :(", 90, 320);
//     }
// }


// function placePipes() {
//     if (gameOver) {
//         return;
//     }

//     let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
//     let openingSpace = boardHeight / 4.5;

//     let topPipe = {
//         img: topPipeImg,
//         x: pipeX,
//         y: randomPipeY,
//         width: pipWidth,
//         height: pipeHeight,
//         passed: false
//     }

//     pipeArray.push(topPipe);

//     let bottomPipe = {
//         img: bottomPipeImg,
//         x: pipeX,
//         y: randomPipeY + pipeHeight + openingSpace,
//         width: pipWidth,
//         height: pipeHeight,
//         passed: false
//     }

//     pipeArray.push(bottomPipe);
// }


// function moveBird(e) {
//     if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" || e.type === "touchstart") {
//         //* jump
//         velocityY = -6;

//         //* reset game 
//         if (gameOver) {
//             bird.y = birdY;
//             pipeArray = [];
//             score = 0;
//             gameOver = false;
//         }
//     }
// }


// function detectCollision(a, b) {
//     return a.x < b.x + b.width &&
//         a.x + a.width > b.x &&
//         a.y < b.y + b.height &&
//         a.y + a.height > b.y
// }


//* board

let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//* bird

let birdWidth = 34; //* width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

//* pipes
let pipeArray = [];
let pipWidth = 64; //* width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//* physics
let velocityX = isMobile() ? -3.5 : -1.5; //* pipes moving left speed
let velocityY = 0; //* bird jump speed
let gravity = isMobile() ? 0.45 : 0.25;

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); //* used for drawing on the board

    //* draw flappy bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //* load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    let interval = isMobile() ? 3000 : 1000; //* every 1.5 seconds for mobile, every 1 second for others
    setInterval(placePipes, interval);

    document.addEventListener("keydown", moveBird);

    //* Add touch event listener for mobile devices
    document.addEventListener("touchstart", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //* bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); //* apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    //* pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //* 0.5 because there are 2 pipes 
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    //* clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < 1 - pipWidth) {
        pipeArray.shift(); //* removes first element from the array
    }

    //* score
    context.fillStyle = "white";
    context.font = "bold 25px sans-serif";
    context.fillText(score, 20, 45);

    //* game over
    if (gameOver) {
        context.fillText("GAME OVER :(", 90, 320);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = boardHeight / 4.5; //* increased opening space for mobile

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    //* Check for both keyboard and touch events
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" || e.type === "touchstart") {
        //* jump
        velocityY = -6;

        //* reset game 
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
