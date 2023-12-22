export class CShape {
    radius = 0;
    fillColor = 'white';
    outColor = 'black';
    thickness = 2;
    points = 0;

    constructor(r, points, fillColor, outColor, thickness) {
        this.radius = r;
        this.points = points;
        this.fillColor = fillColor;
        this.outColor = outColor;
        this.thickness = thickness;
    }
}