import { Entity } from "./Entity";

export class EntityManager {

    numberOfEntities = 0;

    entities = [];
    entityMap = {
        player: [],
        bullets: [],
        enemies: []
    };
    toAdd = [];

    init() {}

    update() {
        this.removeDeadEntities();

        for (const e in this.toAdd) {
            this.entities.push(e);
            // add to map?
        }
        this.toAdd = [];
    }

    removeDeadEntities() {
        // remove from both
        // this.entities
        // this.entityMap

        //todo: collect ids of entities
        let idsToDelete = []        
        for (const e in this.entities) {
            if (!e.isActive()) {
                idsToDelete = [...idsToDelete, e.getId()]
            }
        }
        // todo: use map of filter to save 
            // new entities arr version
            // and new entities map
    }

    addEntity(tag) {
        const newEntityId = this.getNumberOfEntities() + 1;
        
        const entity = new Entity(newEntityId, tag);

        this.toAdd.push(entity);

        // todo: use tag to push entity to map

        return entity;
    }
    getEntities() {
        return this.entities;
    }

    getEntitiesByTag(tag) {
        return this.entityMap[tag];
    }

    getNumberOfEntities() {
        return this.numberOfEntities;
    }
}