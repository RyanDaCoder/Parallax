class SpriteSheet {
    constructor (src, width, height, states = {}, newWidth = width, newHeight = height) {
        this.img = new Image ();
        this.img.src = src;

        this.states = states;
        this.width = width;
        this.height = height;
        this.newWidth = newWidth;
        this.newHeight = newHeight;

    }
    draw (ctx, x, y, t = Date.now(), state) {
        if (state === undefined) {
            return
        }
        
        var [row, numberFrames, frameTime] = this.states[state]
        var index = Math.floor(t % (numberFrames * frameTime) / frameTime);
        
        ctx.drawImage(this.img, index * this.width, row * this.height, this.width, this.height, x, y, this.newWidth, this.newHeight);
    }
}