import { Entity } from "./Entity";

export class EntityManager {

    numberOfEntities = 0;

    entities = [];
    entityMap = {
        player: [],
        bullet: [],
        enemy: []
    };
    toAdd = [];

    init() {}

    resetEntities() {
        this.entities = [];
        this.entityMap = {
            player: [],
            bullet: [],
            enemy: []
        };
    }

    update() {
        this.removeDeadEntities();

        for (const e in this.toAdd) {
            this.entities.push(e);
            // add to map?
        }
        this.toAdd = [];
    }

    setEntities(entities) {
        this.entities = entities
    }

    setEntityMap(entityMap) {
        this.entityMap = entityMap
    }

    removeEntity(id) {
        const newEntities = this.entities.filter(entity => entity.id !== id);
        this.setEntities(newEntities);
    }

    removeEntityByTag(tag, id) {
        const entityMapPart = this.entityMap[tag];
        const newEntityMapPart = entityMapPart.filter(entity => entity.id !== id);
        const newEntityMap = {
            ...this.entityMap,
            [tag]: newEntityMapPart
        };
        this.setEntityMap(newEntityMap);
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

    setNumberOfItems(numberOfEntities) {
        this.numberOfEntities = numberOfEntities;
    }

    addEntity(tag) {
        const newEntityId = this.getNumberOfEntities() + 1;

        this.numberOfEntities = newEntityId;
        
        const entity = new Entity(newEntityId, tag);

        // this.toAdd.push(entity);

        // todo: use tag to push entity to map
        this.entities = [...this.entities, entity];
        this.entityMap[tag] = [...this.entityMap[tag], entity]

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