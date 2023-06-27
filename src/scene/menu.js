class MenuLayer extends cc.Layer {
    ctor() {
        super.ctor();

        let winSize = cc.director.getWinSize();
        let center = cc.p(winSize.width / 2, winSize.height / 2);

        let menu = new cc.Menu();

        let play1FontItem = new cc.MenuItemFont('Play Normal', this.startNormal, this);
        play1FontItem.setFontSize(50);

        let play2FontItem = new cc.MenuItemFont('Play Special', this.startSpecial, this);
        play2FontItem.setFontSize(50);

        let highFontItem = new cc.MenuItemFont('High Score', this.showHighScore, this);
        highFontItem.setFontSize(50);

        menu.addChild(play1FontItem);
        menu.addChild(play2FontItem);
        menu.addChild(highFontItem);

        menu.setPosition(center);
        menu.alignItemsVertically();

        this.addChild(menu);

        return true;
    }

    startNormal() {
        cc.director.runScene(new GameScene());
    }

    startSpecial() {
        cc.director.runScene(new GameScene(true));
    }

    showHighScore() {
        cc.director.runScene(new HighScoreScene()); 
    }
};

class MenuScene extends cc.Scene {
    onEnter() {
        super.onEnter();

        let layer = new MenuLayer();
        this.addChild(layer);
    }
};