const ENEMY_DEFAULT_OPTIONS = {
    speed: 1,
    hp: 50,
    state: undefined,
}

class Enemy {
    constructor (sprite, x, y, width, height, options = {}) {
        const { speed, hp, state } = Object.assign({}, ENEMY_DEFAULT_OPTIONS, options);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.hp = hp;
        this.speed = speed;
        this.state = state;
    }

    draw (ctx, x, y, t = Date.now()) {
        this.sprite.draw(ctx, x - cameraX, y, t, this.state);
    }
}

const DRAGON_SPRITE = new SpriteSheet("badGuyTest.png", 573/3, 644/4, {
    "FLY_RIGHT": [1, 3, 200],
    "FLY_LEFT": [3, 3, 200],
}, 250, 250)

class Dragon extends Enemy{
    constructor (x, y) {
        super(DRAGON_SPRITE, x, y, 50, 50, {state: "FLY_LEFT"}) 
    }
}