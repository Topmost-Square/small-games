export class Shape {
    text = 'Circle';
    x = 0;
    y = 0;
    sx = 0;
    sy = 0;
    color = 'rgba(255, 255, 255, 1)';

    constructor(text, x, y, sx, sy, r, g, b) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.sx = sx * 10;
        this.sy = sy * 10;
        this.color = `rgba(${r}, ${g}, ${b}, 1)`;
    }

    draw(ctx) {}

    update(wW, wH) {}
}