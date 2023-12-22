import { Vec2 } from "../Vec2";

export class CTransform {
    pos = new Vec2(0,0);
    velocity = new Vec2(0,0);
    angle = 0.0;

    constructor(p,v,a) {
        this.pos = p;
        this.velocity = v;
        this.angle = a;
    }
}