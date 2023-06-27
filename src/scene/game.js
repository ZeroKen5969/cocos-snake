class Game {
    time = 0;
    food = new Food();
    score = new ScoreBoard();
    level = new LevelBoard();
    snake = new Snake();
}

class GameAreaInfo {
    #xMargin = 20;
    #yMargin = 20;
    #topOffset = 10;
    #left = this.#xMargin;
    #right = cc.winSize.width - this.#xMargin;
    #bottom = this.#yMargin;
    #top = cc.winSize.height - this.#yMargin - this.#topOffset;
    #width = this.#right - this.#left;
    #height = this.#top - this.#bottom;
    #grid = {
        x: 60,
        y: 40
    }; // {x格數, y格數}
    #unit = {
        x: this.#width / this.#grid.x,
        y: this.#height / this.#grid.y,
    };

    create() {
        let drawer = new cc.DrawNode();
        drawer.drawRect(
            cc.p(this.#left, this.#bottom),
            cc.p(this.#right, this.#top),
            null, 2
        );
        return drawer;
    }

    getPos(p) {
        return cc.p(
            p.x * this.#unit.x + this.#left + this.#unit.x / 2, // this.unitX / 2 ==> 圓形中心點加半徑
            p.y * this.#unit.y + this.#bottom + this.#unit.y / 2,
        );
    }

    checkBound(p) {
        return p.x < 0 || p.y < 0 || p.x >= this.#grid.x || p.y >= this.#grid.y
    }

    getRandomPos() {
        return cc.p(
            Math.floor(Math.random() * this.#grid.x),
            Math.floor(Math.random() * this.#grid.y)
        )
    }

    getCenterPos() {
        return cc.p(this.#grid.x / 2, this.#grid.y / 2);
    }

    resolveBoundPoint(bp) {
        return cc.p(
            (bp.x + this.#grid.x) % this.#grid.x, 
            (bp.y + this.#grid.y) % this.#grid.y
        );
    }
}

class GameLayer extends cc.Layer {
    ctor(special) {
        super.ctor();

        this.special = special;

        this.area = new GameAreaInfo();
        this.data = new Game();

        utils.setup(this.area);

        this.start();
    }

    start() {
        this.addChild(this.data.score.create());
        this.addChild(this.data.level.create());
        this.addChild(this.area.create());

        this.render();

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: (key, event) => {
                let nextDir = 0;

                switch (key) {
                    case cc.KEY.up:
                    case cc.KEY.w:
                        nextDir = Direction.Up;
                        break;
                    case cc.KEY.right:
                    case cc.KEY.d:
                        nextDir = Direction.Right;
                        break;
                    case cc.KEY.down:
                    case cc.KEY.s:
                        nextDir = Direction.Down;
                        break;
                    case cc.KEY.left:
                    case cc.KEY.a:
                        nextDir = Direction.Left;
                        break;
                    case cc.KEY.space:
                        if (this.data.snake.dead) {
                            this.restart();
                            return;
                        }
                        break;
                    case cc.KEY.escape:
                        if (this.data.snake.dead) {
                            this.backToMenu();
                            return;
                        }
                        break;
                    default:
                        break;
                }

                if (!nextDir || Math.abs(this.data.snake.direction) == Math.abs(nextDir)) {
                    return
                }

                this.data.snake.direction = nextDir;
            },
        }, this);

        this.scheduleUpdate();
    }

    showGameOver() {
        this.data.snake.dead = true;
        this.addChild(new GameOver().create());
    }

    restart() {
        cc.director.runScene(new GameScene(this.special));
    }

    backToMenu() {
        cc.director.runScene(new MenuScene());
    }

    render() {
        this.removeChild(this.data.snake.drawer);
        this.removeChild(this.data.food.drawer);

        this.data.score.render();
        this.data.level.render();

        this.addChild(this.data.snake.create());
        this.addChild(this.data.food.create());
    }

    update(dt) {
        if (this.data.snake.dead) {
            return;
        }

        this.data.time += dt;

        let move = this.data.snake.getMove(this.data.time);
        if (move.step > 0) {
            this.data.time = move.remain;
            this.data.snake.move((sp) => {
                if (this.area.checkBound(sp)) {
                    if (this.special) {
                        return ObjectTag.SpecialBound;
                    } else {
                        this.showGameOver();
                        return ObjectTag.Bound;
                    }
                }

                if (this.data.snake.findNode(sp)) {
                    this.showGameOver();
                    return ObjectTag.Snake;
                }
                // cc.log(sp, this.data.food);
                if (this.data.food.isFoodPoint(sp)) {
                    this.data.score.addScore(100);
                    this.data.snake.addLevel();
                    this.data.level.addLevel(this.special);
                    this.data.food.updatePoint();
                    return ObjectTag.Food;
                }

                return ObjectTag.None;
            });
            this.render();
        }
    }
};

class GameScene extends cc.Scene {
    ctor(special) {
        super.ctor();

        this.special = special;
    }

    onEnter() {
        super.onEnter();
        let layer = new GameLayer(this.special);
        this.addChild(layer);
    }
};