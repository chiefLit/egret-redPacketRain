/**
 * 🧧
 */

class RedPacket extends egret.Sprite {
    // 是否被点击
    private isTapped: boolean = false;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    // 初始化
    private initView(): void {
        this.setPacketBackground();
        this.setOriginPositon();
    }

    // 初始化背景图片
    private setPacketBackground(): void {
        let bg: egret.Bitmap = new egret.Bitmap();
        let index = Math.ceil(Math.random() * 4)
        bg.texture = RES.getRes("redpacket_person" + index + "@2x_png");
        // let bg:egret.Sprite = new egret.Sprite();
        // bg.graphics.beginFill(0xff0000);
        // bg.graphics.drawRect(0,0,50,100);
        // bg.graphics.endFill();
        this.width = bg.width;
        this.height = bg.height;
        this.addChild(bg);
    }

    // 初始化坐标
    private setOriginPositon(): void {
        this.y = -this.height;
        this.x = Math.random() * (GameData.stageWidth - this.width);
    }


    // 点击事件
    private onTouchTap(): void {
        this.isTapped = true;
        GameControl.addPackets();
        // let tw = egret.Tween.get(this);
        // tw.to({
        //     x: this.x - .1 * this.width / 2,
        //     y: this.y - .1 * this.height / 2,
        //     width: this.width * 1.1,
        //     height: this.height * 1.1
        // }, 100)
        this.removeListener();
    };

    private removeListener(): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

}