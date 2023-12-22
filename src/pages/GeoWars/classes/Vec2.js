export class Vec2 {
    x = 0.0;
    y = 0.0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isEqual(vec2) {
        return this.x === vec2.x && this.y === vec2.y;
    }

    add(vec2) {
        return new Vec2(
            this.x + vec2.x, 
            this.y + vec2.y
        );
    }
    sub(vec2) {
        return new Vec2(
            this.x - vec2.x,
            this.y - vec2.y
        );
    }
    multiply(floatVal) {
        return new Vec2(
            this.x * floatVal,
            this.y * floatVal
        );
    }
    divide(floatVal) {
        return new Vec2(
            this.x / floatVal,
            this.y / floatVal
        );
    }

    normalize() {}
    
    dist(vec2) {
        return Math.sqrt(
            Math.pow(vec2.x - this.x, 2) +
            Math.pow(vec2.y - this.y, 2)
        )
    }
}