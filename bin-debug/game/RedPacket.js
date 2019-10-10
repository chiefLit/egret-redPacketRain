/**
 * 🧧
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var RedPacket = (function (_super) {
    __extends(RedPacket, _super);
    function RedPacket() {
        var _this = _super.call(this) || this;
        // 是否被点击
        _this.isTapped = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
        return _this;
    }
    // 初始化
    RedPacket.prototype.initView = function () {
        this.setPacketBackground();
        this.setOriginPositon();
    };
    // 初始化背景图片
    RedPacket.prototype.setPacketBackground = function () {
        // let bg: egret.Bitmap = new egret.Bitmap();
        // let index = Math.ceil(Math.random() * 4)
        // bg.texture = RES.getRes("redpacket_person" + index + "@2x_png");
        var bg = new egret.Sprite();
        bg.graphics.beginFill(0xff0000);
        bg.graphics.drawRect(0, 0, 50, 100);
        bg.graphics.endFill();
        this.width = bg.width;
        this.height = bg.height;
        this.addChild(bg);
    };
    // 初始化坐标
    RedPacket.prototype.setOriginPositon = function () {
        this.y = -this.height;
        this.x = Math.random() * (GameData.stageWidth - this.width);
    };
    // 点击事件
    RedPacket.prototype.onTouchTap = function () {
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
    ;
    RedPacket.prototype.removeListener = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return RedPacket;
}(egret.Sprite));
__reflect(RedPacket.prototype, "RedPacket");
