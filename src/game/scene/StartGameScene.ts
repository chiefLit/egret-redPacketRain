// TypeScript file

class StartGameScene extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        // this.initView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
    }

    private initView(event: egret.Event): void {
        
        this.addBackground()
        this.addCenterImg()
    }

    // 背景
    private addBackground(): void {
        let bg: egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("redpacket_mainbackground@2x_png");
        this.addChild(bg);
        bg.width = GameData.stageWidth;
        bg.height = GameData.stageHeight;
    }

    private addCenterImg(): void {
        let stage:egret.Sprite = new egret.Sprite();
        
        let img: egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("redpacket_count@2x_png");

        stage.width = img.width / 2;
        stage.height = img.height / 2;

        img.width /= 2;
        img.height /= 2;

        stage.x = (GameData.stageWidth - img.width) / 2;
        stage.y = (GameData.stageHeight - img.height) / 2;
        
        this.addChild(stage)
        
        stage.addChild(img);

        let number: egret.Bitmap = new egret.Bitmap();
        number.texture = RES.getRes("redpacket_number3@2x_png");
        number.width /= 2;
        number.height /= 2;

        stage.addChild(number)
        number.x = (stage.width - number.width) / 2;
        number.y = (stage.height - number.height + 100) / 2;

        this.countdown((num): void => {
            switch (num) {
                case 0:
                    number.texture = RES.getRes("redpacket_number0@2x_png");
                    break;
                case 1:
                    number.texture = RES.getRes("redpacket_number1@2x_png");
                    break;
                case 2:
                    number.texture = RES.getRes("redpacket_number2@2x_png");
                    break;
                default:
                    break;
            }
        });
    }


    private countdown(callBack): void {
        let timer: egret.Timer = new egret.Timer(1000, 3);
        timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
            let num: number = 3 - timer.currentCount;
            callBack(num)
        }, this);

        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (): void => {
            console.log("开始游戏")
            this.endCountdown();
            GameControl.startGame();
        }, this);

        timer.start()
    }

    public endCountdown():void {};

}