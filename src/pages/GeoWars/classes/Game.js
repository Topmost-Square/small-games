import { CInput } from "./components/CInput";
import { CShape } from "./components/CShape";
import { CTransform } from "./components/CTransform";
import { EntityManager } from "./EntityManager";
import { Vec2 } from "./Vec2";

export class Game {
    cnv = null;
    ctx = null;

    entities = [];
    entityManager = new EntityManager();

    text = '';
    score = 0;

    currentFrame = 0;
    lastEnemySpawnTime = 0;

    player = null;

    paused = false;
    running = true;

    init(cnv, ctx) {
        this.cnv = cnv;
        this.ctx = ctx;

        // init key listeners
        // wasd - moving
        // w:
        // player->cInput->up->true

        this.spawnPlayer();
    }

    update() {}

    sMovement() {
        this.player.cTransform.velocity = new Vec2(0,0);

        if (this.player.cInput.up) {
            this.player.cTransform.velocity.y = -5;
        }

        this.player.cTransform.pos.x += this.player.cTransform.velocity.x;
        this.player.cTransform.pos.y += this.player.cTransform.velocity.y;
    }

    sUserInput() {}

    sLifespan() {}

    sRender() {
        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);

        for (const e in this.entities) {

            // todo: DRAW e.cShape with e.cTransform.pos.x & e.cTransform.pos.y
            // todo: rotate e.cShape with e.cTransform.angle += 1.0f

        }
    }

    sEnemySpawner() {
        this.spawnEnemy();
    }

    sCollision() {
        for (const b in this.entityManager.getEntitiesByTag('bullet')) {
            for (const e in this.entityManager.getEntitiesByTag('enemy')) {
                // delete enemy
                // score
                // delete bullet
            }
        }
    }

    spawnPlayer() {
        const entity = this.entityManager.addEntity('player');

        const mx = this.cnv.width / 2.0;
        const my = this.cnv.height / 2.0;

        entity.cTransform = new CTransform(
            Vec2(mx, my),
            Vec2(0, 0),
            0.0
        );

        // 32 radius
        // 8 sides
        // 4 thickness
        entity.cShape = new CShape(
            32.0, 
            8,
            `rgba(255, 255, 255, 1)`,
            `rgba(255, 255, 255, 1)`,
            4.0
        );

        entity.cInput = new CInput();

        this.entities = [...this.entities, entity];

        this.player = entity;
    }

    spawnEnemy() {
        const entity = this.entityManager.addEntity('enemy');

        const ex = Math.random(this.cnv.width);
        const ey = Math.random(this.cnv.height);
        
        entity.cTransform = CTransform(
            Vec2(ex, ey),
            Vec2(0.0, 0.0),
            0.0
        );

        entity.cShape = CShape(
            16.0, 
            3,
            `rgba(255, 255, 255, 1)`,
            `rgba(255, 255, 255, 1)`,
            4.0
        );

        this.lastEnemySpawnTime = this.currentFrame;
    }

    spawnSmallEnemies(entity) {

    }

    spawnBullet(entity, mousePosVec2) {
        const bullet = this.entityManager.addEntity('bullet');

        bullet.cTransform = new CTransform(
            mousePosVec2,
            Vec2(0,0),
            0
        );
        bullet.cShape = new CShape(
            10,
            8,
            `rgba(255, 255, 255, 1)`,
            `rgba(255, 255, 255, 1)`,
            2
        )
    }

    spawnSpecialWeapon(entity) {}

    run() {
        if (this.entities.length) {
            this.entities.forEach(
                entity => entity.update()
            );
        }

        this.sEnemySpawner();
        this.sMovement();
        this.sCollision();
        this.sUserInput();
        this.sRender();

        this.currentFrame++;
    }
}