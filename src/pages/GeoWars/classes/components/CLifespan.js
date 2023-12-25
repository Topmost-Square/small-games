export class CLifespan {
    remaining = 0;
    total = 0;

    constructor(total) {
        this.remaining = total;
        this.total = total;
    }

    reduce() {
        this.remaining--;
    }

    percentage() {
        return this.remaining / this.total * 100;
    }
}