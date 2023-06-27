class HighScoreLayer extends cc.Layer {
    ctor() {
        super.ctor();

        const size = cc.winSize;
        const title = new cc.LabelTTF("High Score", "Arial", 50);
        title.x = size.width / 2;
        title.y = size.height - 50;
        this.addChild(title);

        const scoreTitle = new cc.LabelTTF("Normal Mode", "Arial", 40);
        scoreTitle.x = size.width / 2;
        scoreTitle.y = size.height / 10 * 7;

        const scoreText = new cc.LabelTTF("", "Arial", 30);
        scoreText.x = size.width / 2;
        scoreText.y = size.height / 10 * 6;

        const maxLevel = StorageUtils.instance.maxLevel;
        if (maxLevel) {
            scoreText.setString(`Max Level: ${maxLevel}`);
        } else {
            scoreText.setString(`No Record Found!`);
        }

        this.addChild(scoreTitle);
        this.addChild(scoreText);

        const specScoreTitle = new cc.LabelTTF("Special Mode", "Arial", 40);
        specScoreTitle.x = size.width / 2;
        specScoreTitle.y = size.height / 10 * 4;

        const specScoreText = new cc.LabelTTF("", "Arial", 30);
        specScoreText.x = size.width / 2;
        specScoreText.y = size.height / 10 * 3;

        const specMaxLevel = StorageUtils.instance.penetrateMaxLevel;
        if (specMaxLevel) {
            specScoreText.setString(`Max Level: ${specMaxLevel}`);
        } else {
            specScoreText.setString(`No Record Found!`);
        }

        this.addChild(specScoreTitle);
        this.addChild(specScoreText);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: (key, event) => {
                switch (key) {
                    case cc.KEY.escape:
                        this.backToMenu();
                        break;
                    default:
                        break;
                }
            },
        }, this);

        return true;
    }

    backToMenu() {
        cc.director.runScene(new MenuScene());
    }
};

class HighScoreScene extends cc.Scene {
    onEnter() {
        super.onEnter();

        let layer = new HighScoreLayer();
        this.addChild(layer);
    }
};