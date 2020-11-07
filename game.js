var canvas = document.getElementById("game");
var ctx = canvas.getContext('2d');
var activeGame = false;

var foregroundImage = new Image();
foregroundImage.src = "foreground.png";

var middleGroundImage = new Image();
middleGroundImage.src = "middleground.png";

var backgroundImage = new Image();
backgroundImage.src = "background.png";

var player = {
    width: 50,
    height: 50,
    x: 200,
    y: 400,
    speed: 4,
    move: function () {
        if (keys["w"]) {
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = 0;
            }
        }
        if (keys["s"]) {
            this.y += this.speed;
            if (this.y > 550) {
                this.y = 550;
            }
        }
        if (keys["a"]) {
            this.x -= this.speed;
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x < cameraX + 200) {
                cameraX -= this.speed;
            }
            //add checking for when camera scolls off the screen.
        }
        if (keys["d"]) {
            this.x += this.speed;
            if (this.x > levelWidth) {
                this.x = levelWidth;
            }
            if (this.x > cameraX + 600) {
                cameraX += this.speed;
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
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - cameraX, this.y - cameraY, this.width, this.height);
    }
}

var keys = [];
window.onkeydown = function (e) {
    keys[e.key] = true;
};
window.onkeyup = function (e) {
    keys[e.key] = false;
}

function startGame() {
    drawScreen(cameraX/levelWidth);
    draw();
    move();
    window.requestAnimationFrame(startGame)
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
    ctx.drawImage(backgroundImage, 0, 0, backgroundWidth, 200)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
        //think of getting rid of setTransform for a translate 
        //that does the opposite of the previous translate to prevent side effects.

    ctx.translate(-(middlegroundWidth - gameWidth) * ratio, 0);
    ctx.drawImage(middleGroundImage, 0, 200, middlegroundWidth, 200);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.translate(-(foregroundWidth - gameWidth) * ratio, 0);
    ctx.drawImage(foregroundImage, 0, 400, foregroundWidth, 200);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

}

//player.x/gamewidth is the percent position of the player in the game
//the background width - game width = is the portion of the screen off the screen
// multiply the percent * size, you get value to translate origin to draw backgrounds