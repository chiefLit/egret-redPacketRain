// TypeScript file

class PlayGameScene extends egret.DisplayObjectContainer {
    private timeOnEnterFrame: number = 0;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.timeOnEnterFrame = egret.getTimer();
    }

    // 左上角读秒文本
    private secondText: egret.TextField;

    // 右上角点中红包数量
    private packetSumText: egret.TextField;

    private packetList = [];


    private initView(): void {
        GameControl.init();
        this.addBackground();
        this.addTopLeft();
        this.addTopRight();
        
    }

    // 背景
    private addBackground(): void {
        let bg: egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("redpacket_background@2x_png");
        this.addChild(bg);
        bg.width = GameData.stageWidth;
        bg.height = GameData.stageHeight;
        this.gameStart()
    }

    // 游戏倒计时
    private gameStart(): void {
        GameControl.startGame();
        let timer: egret.Timer = new egret.Timer(1000, GameData.duration / 1000);
        timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
            let num: number = GameData.duration / 1000 - timer.currentCount;
            this.secondText.text = num + '秒';
        }, this);

        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (): void => {
            console.log("游戏结束")
            GameControl.endGame()
        }, this);

        this.addPacket();
        timer.start()
    }

    // 定时添加红包
    private addPacket(): void {
        let timer: egret.Timer = new egret.Timer(GameData.packetInterval, GameData.duration / GameData.packetInterval)

        timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
            this.packetSumText.text = GameControl.getPackets() + '个';
            if (GameControl.getGameState() == 2) {
                // 游戏结束
            } else {
                if (Math.random() > GameData.packetProbability) {
                    let redPacket: RedPacket = new RedPacket();
                    this.packetList.push(redPacket)
                    this.addChild(redPacket)
                }
            }
        }, this);

        timer.start()

    }

    // 帧事件
    private onEnterFrame(): void {
        this.packetList.map((packet, index) => {
            // 游戏结束操作
            if (GameControl.getGameState() === 2) {
                packet.removeListener()
                this.removeChild(packet)
                this.packetList = [];
                return;
            }
            if (packet.isTapped === true) {
                packet.removeListener()
                this.packetList.splice(index, 1);
                this.removeChild(packet)
            } else {
                if (packet.y > GameData.stageHeight + packet.height) {
                    packet.removeListener()
                    this.packetList.splice(index, 1);
                } else {
                    let now = egret.getTimer();
                    let time = this.timeOnEnterFrame;
                    let pass = now - time;
                    packet.y += pass * GameData.speed / 10;
                }
            }
        })
        this.timeOnEnterFrame = egret.getTimer();
    }

    // 左上角图标
    private addTopLeft(): void {
        let topLeftSpr: egret.Sprite = new egret.Sprite();

        let img: egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("redpacket_time@2x_png");
        topLeftSpr.addChild(img);
        img.width /= 2;
        img.height /= 2;

        this.addChild(topLeftSpr)
        topLeftSpr.width = img.width;
        topLeftSpr.height = img.height;
        topLeftSpr.x = 10;
        topLeftSpr.y = 10;

        this.secondText = new egret.TextField();
        this.setTopTextStyle(this.secondText, topLeftSpr);
        this.secondText.text = "10秒"
        topLeftSpr.addChild(this.secondText)
    }

    // 右上角图标
    private addTopRight(): void {
        let topRightSpr: egret.Sprite = new egret.Sprite();

        let img: egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("redpacket_number@2x_png");
        topRightSpr.addChild(img);
        img.width /= 2;
        img.height /= 2;

        this.addChild(topRightSpr)
        topRightSpr.width = img.width;
        topRightSpr.height = img.height;
        topRightSpr.x = GameData.stageWidth - img.width - 10;
        topRightSpr.y = 10;

        this.packetSumText = new egret.TextField();
        this.setTopTextStyle(this.packetSumText, topRightSpr);
        this.packetSumText.text = "0个"
        topRightSpr.addChild(this.packetSumText)
    }

    private setTopTextStyle(topText: egret.TextField, spr: egret.Sprite): void {
        topText.textColor = 0xd91935;
        topText.size = 18;
        topText.width = 54;
        topText.height = 23;
        topText.textAlign = 'right';
        topText.x = spr.width - topText.width - 18;
        topText.y = spr.height - topText.height;
    }
}