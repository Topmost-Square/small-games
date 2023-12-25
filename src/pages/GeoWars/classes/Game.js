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

    keyDownListener(e) {
        switch (e.key) {
            case 'w':
                this.player.cInput.up = true;
                break;
            case 'a':
                this.player.cInput.left = true;
                break;
            case 's':
                this.player.cInput.down = true;
                break;
            case 'd':
                this.player.cInput.right = true;
                break;
            case 'p':
                this.player.cInput.shoot = true;
                break;
            default:
                return;
        }
    }

    keyUpListener(e) {
        switch (e.key) {
            case 'w':
                this.player.cInput.up = false;
                break;
            case 'a':
                this.player.cInput.left = false;
                break;
            case 's':
                this.player.cInput.down = false;
                break;
            case 'd':
                this.player.cInput.right = false;
                break;
            default:
                return;
        }
    }

    mouseDownListener(e) {
        const { screenX, screenY, clientX, clientY } = e;

        this.spawnBullet(
            this.player.cTransform.pos, 
            new Vec2(clientX, clientY)
        );
    }

    mouseUpListener(e) {}

    init(cnv, ctx) {
        this.cnv = cnv;
        this.ctx = ctx;

        window.addEventListener('keydown', e => this.keyDownListener(e));
        window.addEventListener('keyup', e => this.keyUpListener(e));

        window.addEventListener('mousedown', e => this.mouseDownListener(e));
        window.addEventListener('mouseup', e => this.mouseUpListener(e));

        this.spawnPlayer();
    }

    update() {}

    playerMovement() {
        this.player.cTransform.velocity = new Vec2(0,0);

        if (this.player.cInput.up) {
            this.player.cTransform.velocity.y = -5.0;
        }

        if (this.player.cInput.down) {
            this.player.cTransform.velocity.y = 5.0;
        }

        if (this.player.cInput.left) {
            this.player.cTransform.velocity.x = -5.0;
        }

        if (this.player.cInput.right) {
            this.player.cTransform.velocity.x = 5.0;
        }

        if (this.player.cTransform.pos.x - this.player.cShape.radius <= 0) {
            this.player.cTransform.pos.x = this.player.cShape.radius;
        }

        if (this.player.cTransform.pos.y - this.player.cShape.radius <= 0) {
            this.player.cTransform.pos.y = this.player.cShape.radius;
        }

        if (this.player.cTransform.pos.x + this.player.cShape.radius >= this.cnv.width) {
            this.player.cTransform.pos.x = this.cnv.width - this.player.cShape.radius
        }

        if (this.player.cTransform.pos.y + this.player.cShape.radius >= this.cnv.height) {
            this.player.cTransform.pos.y = this.cnv.height - this.player.cShape.radius;
        }

        this.player.cTransform.pos.x += this.player.cTransform.velocity.x;
        this.player.cTransform.pos.y += this.player.cTransform.velocity.y;
    }

    bulletMovement() {
        for (const b of this.entityManager.getEntitiesByTag('bullet')) {
            b.cTransform.pos.x += b.cTransform.velocity.x;
            b.cTransform.pos.y += b.cTransform.velocity.y;
        }
    }

    enemyMovement() {
        for (const e of this.entityManager.getEntitiesByTag('enemy')) {
            e.cTransform.pos.x += e.cTransform.velocity.x;
            e.cTransform.pos.y += e.cTransform.velocity.y;

            if (e.cTransform.pos.x - e.cShape.radius <= 0) {
                e.cTransform.velocity.x = -e.cTransform.velocity.x
            }

            if (e.cTransform.pos.y - e.cShape.radius <= 0) {
                e.cTransform.velocity.y = -e.cTransform.velocity.y
            }

            if (e.cTransform.pos.x + e.cShape.radius >= this.cnv.width) {
                e.cTransform.velocity.x = -e.cTransform.velocity.x
            }

            if (e.cTransform.pos.y + e.cShape.radius >= this.cnv.height) {
                e.cTransform.velocity.y = -e.cTransform.velocity.y
            }
        }
    }

    sMovement() {
        this.playerMovement();
        this.bulletMovement();

        this.enemyMovement();
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
         
        this.ctx.strokeStyle = e.cShape.outColor;
        this.ctx.fillStyle = e.cShape.fillColor;
        this.ctx.fill();
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
                // this.rotatePolygon(e);
            }
        }
    }

    sEnemySpawner() {
        if (this.currentFrame - this.lastEnemySpawnTime >= 60) {
            this.spawnEnemy();
        }
    }

    sCollision() {
        if (
            this.entityManager.getEntitiesByTag('bullet').length && 
            this.entityManager.getEntitiesByTag('enemy').length
        ) {
            for (const b of this.entityManager.getEntitiesByTag('bullet')) {
                for (const e of this.entityManager.getEntitiesByTag('enemy')) {
                    // delete enemy
                    // score
                    // delete bullet

                    const d = b.cTransform.pos.sub(e.cTransform.pos);
    
                    const l = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.y, 2));
        
                    const enemyRad = e.cShape.radius;
                    const bulletRad = b.cShape.radius;

                    if (l < enemyRad + bulletRad) {
                        const bulletId = b.id;
                        const enemyId = e.id;

                        this.entityManager.removeEntity(bulletId);
                        this.entityManager.removeEntity(enemyId);

                        this.entityManager.removeEntityByTag('bullet', bulletId);
                        this.entityManager.removeEntityByTag('enemy', enemyId);
                    }
                }
            }
        }
        

        if (this.entityManager.getEntitiesByTag('enemy').length) {
            for (const e of this.entityManager.getEntitiesByTag('enemy')) {               
                const d = this.player.cTransform.pos.sub(e.cTransform.pos);
    
                const l = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.y, 2));
    
                const enemyRad = e.cShape.radius;
                const playerRad = this.player.cShape.radius;
    
                if (l < enemyRad + playerRad) {
                    this.entityManager.resetEntities();
                    this.entityManager.setNumberOfItems(0);

                    this.spawnPlayer();
                }
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

        const ex = Math.random() * this.cnv.width;
        const ey = Math.random() * this.cnv.height;

        const sx = Math.random() < .5 ? - 1 : 1 * Math.random() * 3;
        const sy = Math.random() < .5 ? - 1 : 1 * Math.random() * 3;
        
        entity.cTransform = new CTransform(
            new Vec2(ex, ey),
            new Vec2(sx, sy),
            0.0
        );

        const vertices = Math.floor(Math.random() * 8) + 3

        entity.cShape = new CShape(
            32.0, 
            vertices,
            `rgba(0, 0, 0, 1)`,
            `rgba(255, 0, 0, 1)`,
            4.0
        );

        this.lastEnemySpawnTime = this.currentFrame;
    }

    spawnSmallEnemies(entity) {

    }

    spawnBullet(shooterPos, mousePosVec2) {
        const bullet = this.entityManager.addEntity('bullet');

        const d = mousePosVec2.sub(shooterPos);

        const l = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.y, 2));

        const n = d.divide(l).multiply(5);

        // - bullet shoot towards mouse
        // m - mouse
        // p - player

        // D = (mx-px, my-py)
        // D has some length L we want it to be S
        // Normalize D, 
        // L = sqrt(x*x + y*y)
        // N = (D.x / L, D.y / L) now has L = 1

        const shooterPosition = new Vec2(shooterPos.x, shooterPos.y);

        bullet.cTransform = new CTransform(
            shooterPosition,
            n,
            0
        );
        bullet.cShape = new CShape(
            10,
            8,
            `rgba(255, 255, 255, 1)`,
            `rgba(255, 255, 255, 1)`,
            2
        );


    }

    spawnSpecialWeapon(entity) {}

    run() {
        // if (this.entities.length) {
        //     this.entities.forEach(
        //         entity => entity.update()
        //     );
        // }

        this.sEnemySpawner();
        this.sMovement();
        this.sCollision();
        this.sUserInput();
        this.sRender();

        this.currentFrame++;
    }
}