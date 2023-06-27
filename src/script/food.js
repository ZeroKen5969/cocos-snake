class Food {
    #radius = null;
    #node = null;
    #drawer = null; // DrawNode

    get drawer() {
        return this.#drawer;
    }

    constructor(radius = 5) {
        this.#radius = radius;
    }

    create() {
        if (!this.#node) {
            this.updatePoint();
        }

        this.#drawer = new cc.DrawNode();

        this.#drawer.drawDot(utils.getAreaPos(this.#node), this.#radius, cc.color(255, 0, 0));

        return this.#drawer;
    }

    updatePoint() {
        this.#node = utils.getRandomPos();
    }

    isFoodPoint(p) {
        return p.x == this.#node.x && p.y == this.#node.y;
    }
}