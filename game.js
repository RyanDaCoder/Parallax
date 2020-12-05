var canvas = document.getElementById("game");
var ctx = canvas.getContext('2d');
var activeGame = false;

var foregroundImage = new Image();
foregroundImage.src = "foreground.png";

var middleGroundImage = new Image();
middleGroundImage.src = "middleground.png";

var backgroundImage = new Image();
backgroundImage.src = "background.png";

var gravity = 0.35;


var test = new SpriteSheet("spritesheetTest.png", 1601/4, 2397/4, {
    "RUN_RIGHT": [3, 4, 250],
    "RUN_LEFT": [2, 4, 125],
    "RUN_FORWARDS": [1, 4, 250],
    "RUN_BACKWARDS": [0, 4, 250],
}, 250, 250)




var player = {
    width: 50,
    height: 50,
    x: 200,
    y: 0,
    dx: 4,
    dy: 0, 
    jumps: 2,
    appearance: new SpriteSheet("spritesheet2.png", 108, 140, {
        "RUN_RIGHT": [0, 8, 100],
        "RUN_LEFT": [1, 8, 100],
    }),
    
    move: function () {
        this.dy += gravity;
        this.y += this.dy;
        if (this.y > 340) {
            this.jumps = 2;
            this.y = 340;
            this.dy *= -.35;
            
        }
        
        if (keys["a"]) {
            this.x -= this.dx;
            this.appearance.state = "RUN_LEFT";
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x < cameraX + 0) {
                cameraX -= this.dx;
            }
            
        }
        if (keys["d"]) {
            this.x += this.dx;
            this.appearance.state = "RUN_RIGHT";
            if (this.x > levelWidth) {
                this.x = levelWidth;
            }
            if (this.x > cameraX + 600) {
                cameraX += this.dx;
            }
        }
//code that scolls camera
        // if (keys["f"]) {
        //     cameraX -= this.speed;
        //     if (cameraX < 0) {
        //         cameraX.x = 0;
        //     }
        // }
        // if (keys["h"]) {
        //      cameraX += this.speed;
        //     if (cameraX > levelWidth) {
        //         cameraX = levelWidth;
        //     }
        // }
    },
    draw: function () {
        //ctx.fillStyle = "blue";
        //ctx.fillRect(this.x - cameraX, this.y - cameraY, this.width, this.height);
        this.appearance.draw(ctx, this.x - cameraX, this.y - cameraY);
    }
}

window.addEventListener("keypress", function (event) {
    if (event.key == " ") {
        if (player.jumps > 0) {
            player.jumps -= 1;
            player.dy = -10;
        }
    }
})

var keys = [];
window.onkeydown = function (e) {
    keys[e.key] = true;
};
window.onkeyup = function (e) {
    keys[e.key] = false;
}

function startGame(time) {
    drawScreen(cameraX/levelWidth);
    draw(time);

    test.draw(ctx, 0, 0, time);

    move(time);
    window.requestAnimationFrame(startGame);
    //console.log(time)
}

function draw() {
    player.draw();

}

function move() {
    player.move();
}

var gameWidth = 800;
var levelWidth = 3200;
var backgroundWidth = 900//900
var middlegroundWidth = 1200;//1000
var foregroundWidth = 1600;//1600
var cameraX = 0;
var cameraY = 0;

function drawScreen(ratio) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(-(backgroundWidth - gameWidth) * ratio, 0);
    ctx.drawImage(backgroundImage, 0, 0, backgroundWidth, 200);
    ctx.translate((backgroundWidth - gameWidth) * ratio, 0);
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
        //think of getting rid of setTransform for a translate 
        //that does the opposite of the previous translate to prevent side effects.

    ctx.translate(-(middlegroundWidth - gameWidth) * ratio, 0);
    ctx.drawImage(middleGroundImage, 0, 200, middlegroundWidth, 200);
    ctx.translate((middlegroundWidth - gameWidth) * ratio, 0);
    //ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.translate(-(foregroundWidth - gameWidth) * ratio, 0);
    ctx.drawImage(foregroundImage, 0, 400, foregroundWidth, 200);
    ctx.translate((foregroundWidth - gameWidth) * ratio, 0);

    //ctx.setTransform(1, 0, 0, 1, 0, 0);

}

//player.x/gamewidth is the percent position of the player in the game
//the background width - game width = is the portion of the screen off the screen
// multiply the percent * size, you get value to translate origin to draw backgrounds