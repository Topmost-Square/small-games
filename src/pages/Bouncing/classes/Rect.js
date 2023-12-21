import { Shape } from "./Shape";

export class Rect extends Shape
{
    w = 0;
    h = 0;
    constructor(config) {
        const { text, x, y, sx, sy, r, g, b, w, h } = config
        super(text, x, y, sx, sy, r, g, b);
        this.w = w;
        this.h = h;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    update(wW, wH) {
        this.x += this.sx;
        this.y += this.sy;

        if (this.x <= 0  || this.x > wW  - this.w) {
            this.sx = this.sx * -1
        }

        if (this.y <= 0 || this.y + this.h > wH) {
            this.sy = this.sy * -1
        }
    }
}