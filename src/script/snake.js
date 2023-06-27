

class Snake {
    direction = Direction.Up;
    dead = false;

    #nodes = [];
    #drawer = null; // DrawNode
    #radius = null;
    #speed = 0.1; // 移動間隔時間

    get drawer() {
        return this.#drawer;
    }

    constructor(radius = 5) {
        this.#radius = radius;
    }

    create() {
        if (!this.#nodes.length) {
            this.#nodes.push(utils.getCenterPos());
        }

        this.#drawer = new cc.DrawNode();

        for (let i = 0; i < this.#nodes.length; ++i) {
            this.#drawer.drawDot(utils.getAreaPos(this.#nodes[i]), this.#radius, cc.color(0, 255, 0));
        }

        if (this.#nodes.length - 1 >= 0) {
            this.#drawer.drawDot(utils.getAreaPos(this.#nodes[this.#nodes.length - 1]), this.#radius, cc.color(0, 0, 255));
        }

        return this.#drawer;
    }

    addLevel() {
        this.#speed = this.#speed / 1.1;
    }

    getMove(time) {
        return {
            step: Math.floor(time / this.#speed),
            remain: time % this.#speed
        };
    }

    findNode(p, begin = 0, end = this.#nodes.length) {
        for (let i = begin; i < this.#nodes.length && i < end; ++i) {
            if (p.x === this.#nodes[i].x && p.y === this.#nodes[i].y) {
                return true;
            }
        }
        return false
    }

    move(onCollisionEnter) {
        let p = this.#nodes[this.#nodes.length - 1];
        let nextPoint = cc.p(p.x, p.y);

        switch (this.direction) {
            case Direction.Up:
                nextPoint.y += 1;
                break;
            case Direction.Right:
                nextPoint.x += 1;
                break;
            case Direction.Down:
                nextPoint.y -= 1;
                break;
            case Direction.Left:
                nextPoint.x -= 1;
                break;
        }

        // 邊界碰撞, 食物碰撞, 身體碰撞檢查
        const tag = onCollisionEnter(nextPoint);
        if (tag == ObjectTag.Bound || tag == ObjectTag.Snake) {
            return false;
        }

        if (tag == ObjectTag.SpecialBound) {
            nextPoint = utils.resolveBoundPoint(nextPoint);
        }

        this.#nodes.push(nextPoint);

        // 有吃到食物則不改變長度
        if (tag != ObjectTag.Food) {
            this.#nodes.shift();
        }

        return true;
    }
}