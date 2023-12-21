import { Shape } from "./Shape";

export class Circle extends Shape
{
    rad = 0;
    constructor(config) {
        const { text, x, y, sx, sy, r, g, b, rad } = config
        super(text, x, y, sx, sy, r, g, b);
        this.rad = rad;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(
            this.x, 
            this.y,
            this.rad,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    update(wW, wH) {
        this.x += this.sx;
        this.y += this.sy;

        if (this.x <= this.rad  || this.x > wW  - this.rad) {
            this.sx = this.sx * -1
        }

        if (this.y <= this.rad || this.y + this.rad > wH) {
            this.sy = this.sy * -1
        }
    }
}