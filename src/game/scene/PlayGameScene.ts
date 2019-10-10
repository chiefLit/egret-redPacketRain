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
        let now = egret.getTimer();
        let time = this.timeOnEnterFrame;
        let pass = now - time;

        let deleteItem = (packet, index) => {
            packet.removeListener()
            this.removeChild(packet);
            this.packetList.splice(index, 1);
        }
        this.packetList.map((packet, index) => {
            // 游戏结束操作
            if (GameControl.getGameState() === 2) {
                deleteItem(packet, index);
                return;
            }
            if (packet.isTapped === true) {
                deleteItem(packet, index);
            } else {
                // setTimeout(() => {
                if (packet.y > GameData.stageHeight + packet.height) {
                    deleteItem(packet, index);
                } else {
                    packet.y += pass * GameData.speed / 1;
                }
                // }, 0)
            }

            this.setChildIndex(this.topLeftSpr, 999)
            this.setChildIndex(this.topRightSpr, 999)
        })
        this.timeOnEnterFrame = now;
    }

    // 左上角图标
    private topLeftSpr: egret.Sprite = new egret.Sprite();

    // 右上角图标
    private topRightSpr: egret.Sprite = new egret.Sprite();


    private addTopLeft(): void {
        let img: egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("redpacket_time@2x_png");
        this.topLeftSpr.addChild(img);
        img.width /= 2;
        img.height /= 2;

        this.addChild(this.topLeftSpr)
        this.setChildIndex(this.topLeftSpr, 999)
        this.topLeftSpr.width = img.width;
        this.topLeftSpr.height = img.height;
        this.topLeftSpr.x = 10;
        this.topLeftSpr.y = 10;

        this.secondText = new egret.TextField();
        this.setTopTextStyle(this.secondText, this.topLeftSpr);
        this.secondText.text = "10秒"
        this.topLeftSpr.addChild(this.secondText)
    }


    private addTopRight(): void {
        let img: egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("redpacket_number@2x_png");
        this.topRightSpr.addChild(img);
        img.width /= 2;
        img.height /= 2;

        this.addChild(this.topRightSpr)
        this.setChildIndex(this.topRightSpr, 999)
        this.topRightSpr.width = img.width;
        this.topRightSpr.height = img.height;
        this.topRightSpr.x = GameData.stageWidth - img.width - 10;
        this.topRightSpr.y = 10;

        this.packetSumText = new egret.TextField();
        this.setTopTextStyle(this.packetSumText, this.topRightSpr);
        this.packetSumText.text = "0个"
        this.topRightSpr.addChild(this.packetSumText)
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