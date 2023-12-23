import { CInput } from "./components/CInput";
import { CShape } from "./components/CShape";
import { CTransform } from "./components/CTransform";
import { EntityManager } from "./EntityManager";
import { Vec2 } from "./Vec2";

export class Game {
    cnv = null;
    ctx = null;

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

    drawPolygon(e) {
        this.ctx.beginPath();
        this.ctx.moveTo(
            e.cTransform.pos.x + e.cShape.radius * Math.cos(0), 
            e.cTransform.pos.y + e.cShape.radius * Math.sin(0)
        );          
         
        for (var i = 1; i <= e.cShape.points; i += 1) {
            this.ctx.lineTo(
                e.cTransform.pos.x + e.cShape.radius * Math.cos(i * 2 * Math.PI / e.cShape.points), 
                e.cTransform.pos.y + e.cShape.radius * Math.sin(i * 2 * Math.PI / e.cShape.points)
            );
        }
         
        this.ctx.strokeStyle = "#000000";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    rotatePolygon(e) {
        this.ctx.translate(e.cTransform.pos.x, e.cTransform.pos.y);
        this.ctx.rotate(e.cTransform.angle);
        this.ctx.translate(-e.cTransform.pos.x, -e.cTransform.pos.y);
    }

    sRender() {
        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);

        if (this.entityManager.entities.length && this.ctx) {
            for (const e of this.entityManager.entities) {
                this.drawPolygon(e);
                this.rotatePolygon(e);
            }
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
            new Vec2(mx, my),
            new Vec2(0, 0),
            1.0
        );

        // 32 radius
        // 8 sides
        // 4 thickness
        entity.cShape = new CShape(
            32.0, 
            8,
            `rgba(255, 255, 255, 1)`,
            `rgba(255, 255, 255, 1)`,
            10
        );

        entity.cInput = new CInput();

        this.player = entity;
    }

    spawnEnemy() {
        const entity = this.entityManager.addEntity('enemy');

        const ex = Math.random(this.cnv.width);
        const ey = Math.random(this.cnv.height);
        
        entity.cTransform = new CTransform(
            new Vec2(ex, ey),
            new Vec2(0.0, 0.0),
            0.0
        );

        entity.cShape = new CShape(
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
            new Vec2(0,0),
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
        // if (this.entities.length) {
        //     this.entities.forEach(
        //         entity => entity.update()
        //     );
        // }

        // this.sEnemySpawner();
        // this.sMovement();
        // this.sCollision();
        // this.sUserInput();
        this.sRender();

        this.currentFrame++;
    }
}