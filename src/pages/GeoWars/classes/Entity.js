export class Entity {
    tag = 'default';
    active = true;
    id = 0;

    constructor(id, tag) {
        this.id = id;
        this.tag = tag;
    }

    cTransform = null;
    cShape = null;
    cCollision = null;
    cInput = null;
    cScore = null;
    cLifespan = null;

    destroy() {}
    isActive() {
        return this.active;
    }
    getTag() {
        return this.tag;
    }
    getId() {
        return this.id;
    }
}