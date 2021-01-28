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


var test = new SpriteSheet("spritesheetTest.png", 1601 / 4, 2397 / 4, {
    "RUN_RIGHT": [3, 4, 250],
    "RUN_LEFT": [2, 4, 125],
    "RUN_FORWARDS": [1, 4, 250],
    "RUN_BACKWARDS": [0, 4, 250],
}, 250, 250);

var enemy = new Dragon(50, 50);
var enemies = [];

var square = {
    x: 350,
    y: 250,
    width: 50,
    height: 50,
    draw: function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

var player = {
    width: 50,
    height: 50,
    x: 200,
    y: 0,
    dx: 4,
    dy: 0,
    jumps: 2,
    state: "RUN_RIGHT",
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
            this.state = "RUN_LEFT";
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x < cameraX + 0) {
                cameraX -= this.dx;
            }

        }
        if (keys["d"]) {
            this.x += this.dx;
            this.state = "RUN_RIGHT";
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
    draw: function (t) {
        //ctx.fillStyle = "blue";
        //ctx.fillRect(this.x - cameraX, this.y - cameraY, this.width, this.height);
        this.appearance.draw(ctx, this.x - cameraX, this.y - cameraY, t, this.state);
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
    drawScreen();
    draw(time);

    test.draw(ctx, 0, 0, time);
    //badGuyTest.draw(ctx, 200, 200, time);
    //dragonTest.draw(ctx, 380, 180, time);

    move(time);
    window.requestAnimationFrame(startGame);
    //console.log(time)
    checkCollisions(player, square);


}

function draw() {
    player.draw();
    square.draw();
    enemy.draw(ctx, 50, 50);
    enemies.forEach(function (e) {
        e.draw(ctx, e.x, e.y, performance.now());
    });
    
}

function move() {
    player.move();
    //enemy.move(50, 50, 1);
}

var gameWidth = 800;
var levelWidth = 6200;
var backgroundWidth = 900 //900
var middlegroundWidth = 1200; //1000
var foregroundWidth = 1600; //1600
var cameraX = 0;
var cameraY = 0;

function drawScreen() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var transBack = ((cameraX / 10)) % backgroundWidth;

    ctx.translate(-transBack, 0);
    ctx.drawImage(backgroundImage, 0, 0, backgroundWidth, 200);
    ctx.drawImage(backgroundImage, backgroundWidth, 0, backgroundWidth, 200);
    ctx.translate(transBack, 0);
    //ctx.setTransform(1, 0, 0, 1, 0, 0);
    //think of getting rid of setTransform for a translate 
    //that does the opposite of the previous translate to prevent side effects.

    var transMid = ((cameraX / 5)) % middlegroundWidth;

    ctx.translate(-transMid, 0);
    ctx.drawImage(middleGroundImage, 0, 200, middlegroundWidth, 200);
    ctx.drawImage(middleGroundImage, middlegroundWidth, 200, middlegroundWidth, 200);
    ctx.translate(transMid, 0);
    //ctx.setTransform(1, 0, 0, 1, 0, 0);

    var transFore = ((cameraX)) % foregroundWidth;

    ctx.translate(-transFore, 0);
    ctx.drawImage(foregroundImage, 0, 400, foregroundWidth, 200);
    ctx.drawImage(foregroundImage, foregroundWidth, 400, foregroundWidth, 200);
    ctx.translate(transFore, 0);
}

function checkCollisions(actor, reciever) {
    const actorLeft = actor.x;
    const actorRight = actor.x + actor.width;
    const actorTop = actor.y;
    const actorBottom = actor.y + actor.height;

    const recieverLeft = reciever.x;
    const recieverRight = reciever.x + reciever.width;
    const recieverTop = reciever.y;
    const recieverBottom = reciever.y + reciever.height;

    const actorLeftIsLeftOfRecieverRight = actorLeft < recieverRight;
    const actorRightIsRightOfRecieverLeft = actorRight > recieverLeft;
    const actorTopIsLowerThanRecieverBottom = actorTop < recieverBottom;
    const actorBottomIsHigherThanRecieverTop = actorBottom > recieverTop;

    console.log({
        actorLeftIsLeftOfRecieverRight, 
        actorRightIsRightOfRecieverLeft,
        actorTopIsLowerThanRecieverBottom,
        actorBottomIsHigherThanRecieverTop
    });
}