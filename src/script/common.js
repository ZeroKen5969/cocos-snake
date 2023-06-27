const ObjectTag = {
    None: 0,
    Food: 1,
    Bound: 2,
    Snake: 3,
    SpecialBound: 4,
}

const Direction = {
    Up: 1,
    Down: -1,
    Right: 2,
    Left: -2
}

class Utils {
    #area = null;

    setup(area) {
        this.#area = area;
    }

    getAreaPos(p) {
        return this.#area.getPos(p);
    }

    getCenterPos() {
        return this.#area.getCenterPos();
    }

    getRandomPos() {
        return this.#area.getRandomPos();
    }

    resolveBoundPoint(bp) {
        return this.#area.resolveBoundPoint(bp);
    }
}

var utils = new Utils();

class ScoreBoard {
    #topOffset = 5;
    #label = null;
    #data = 0;

    create() {
        const size = cc.winSize;
        this.#label = new cc.LabelTTF("", "Arial", 20);
        this.#label.x = size.width / 2;
        this.#label.y = size.height - this.#topOffset;
        this.#label.anchorY = 1;
        return this.#label;
    }

    render(score = this.#data) {
        this.#label.setString("Score: " + score);
    }

    addScore(score) {
        this.#data += score;
    }
}

class LevelBoard {
    #xMargin = 55;
    #topOffset = 5;
    #label = null;
    #data = 1;

    create() {
        const size = cc.winSize;
        this.#label = new cc.LabelTTF("", "Arial", 20);
        this.#label.x = this.#xMargin;
        this.#label.y = size.height - this.#topOffset;
        this.#label.anchorY = 1;
        return this.#label;
    }

    render(level = this.#data) {
        this.#label.setString("Level: " + level);
    }

    addLevel(spceial) {
        this.#data += 1;
        if (spceial) {
            StorageUtils.instance.trySetPenetrateMaxLevel(this.#data);
        } else {
            StorageUtils.instance.trySetMaxLevel(this.#data);
        }
    }
}

class GameOver {
    #label = null;

    create() {
        const size = cc.winSize;
        this.#label = new cc.LabelTTF("Game Over!", "Arial", 50);
        this.#label.x = size.width / 2;
        this.#label.y = size.height / 2;
        return this.#label;
    }
}