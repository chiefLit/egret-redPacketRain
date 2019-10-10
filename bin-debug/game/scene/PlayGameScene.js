// TypeScript file
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
var PlayGameScene = (function (_super) {
    __extends(PlayGameScene, _super);
    function PlayGameScene() {
        var _this = _super.call(this) || this;
        _this.timeOnEnterFrame = 0;
        _this.packetList = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        _this.timeOnEnterFrame = egret.getTimer();
        return _this;
    }
    PlayGameScene.prototype.initView = function () {
        GameControl.init();
        this.addBackground();
        this.addTopLeft();
        this.addTopRight();
    };
    // 背景
    PlayGameScene.prototype.addBackground = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("redpacket_background@2x_png");
        this.addChild(bg);
        bg.width = GameData.stageWidth;
        bg.height = GameData.stageHeight;
        this.gameStart();
    };
    // 游戏倒计时
    PlayGameScene.prototype.gameStart = function () {
        var _this = this;
        GameControl.startGame();
        var timer = new egret.Timer(1000, GameData.duration / 1000);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            var num = GameData.duration / 1000 - timer.currentCount;
            _this.secondText.text = num + '秒';
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            console.log("游戏结束");
            GameControl.endGame();
        }, this);
        this.addPacket();
        timer.start();
    };
    // 定时添加红包
    PlayGameScene.prototype.addPacket = function () {
        var _this = this;
        var timer = new egret.Timer(GameData.packetInterval, GameData.duration / GameData.packetInterval);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.packetSumText.text = GameControl.getPackets() + '个';
            if (GameControl.getGameState() == 2) {
                // 游戏结束
            }
            else {
                if (Math.random() > GameData.packetProbability) {
                    var redPacket = new RedPacket();
                    _this.packetList.push(redPacket);
                    _this.addChild(redPacket);
                }
            }
        }, this);
        timer.start();
    };
    // 帧事件
    PlayGameScene.prototype.onEnterFrame = function () {
        var _this = this;
        this.packetList.map(function (packet, index) {
            // 游戏结束操作
            if (GameControl.getGameState() === 2) {
                packet.removeListener();
                _this.removeChild(packet);
                _this.packetList = [];
                return;
            }
            if (packet.isTapped === true) {
                packet.removeListener();
                _this.packetList.splice(index, 1);
                _this.removeChild(packet);
            }
            else {
                if (packet.y > GameData.stageHeight + packet.height) {
                    packet.removeListener();
                    _this.packetList.splice(index, 1);
                }
                else {
                    var now = egret.getTimer();
                    var time = _this.timeOnEnterFrame;
                    var pass = now - time;
                    packet.y += pass * GameData.speed / 10;
                }
            }
        });
        this.timeOnEnterFrame = egret.getTimer();
    };
    // 左上角图标
    PlayGameScene.prototype.addTopLeft = function () {
        var topLeftSpr = new egret.Sprite();
        var img = new egret.Bitmap();
        img.texture = RES.getRes("redpacket_time@2x_png");
        topLeftSpr.addChild(img);
        img.width /= 2;
        img.height /= 2;
        this.addChild(topLeftSpr);
        topLeftSpr.width = img.width;
        topLeftSpr.height = img.height;
        topLeftSpr.x = 10;
        topLeftSpr.y = 10;
        this.secondText = new egret.TextField();
        this.setTopTextStyle(this.secondText, topLeftSpr);
        this.secondText.text = "10秒";
        topLeftSpr.addChild(this.secondText);
    };
    // 右上角图标
    PlayGameScene.prototype.addTopRight = function () {
        var topRightSpr = new egret.Sprite();
        var img = new egret.Bitmap();
        img.texture = RES.getRes("redpacket_number@2x_png");
        topRightSpr.addChild(img);
        img.width /= 2;
        img.height /= 2;
        this.addChild(topRightSpr);
        topRightSpr.width = img.width;
        topRightSpr.height = img.height;
        topRightSpr.x = GameData.stageWidth - img.width - 10;
        topRightSpr.y = 10;
        this.packetSumText = new egret.TextField();
        this.setTopTextStyle(this.packetSumText, topRightSpr);
        this.packetSumText.text = "0个";
        topRightSpr.addChild(this.packetSumText);
    };
    PlayGameScene.prototype.setTopTextStyle = function (topText, spr) {
        topText.textColor = 0xd91935;
        topText.size = 18;
        topText.width = 54;
        topText.height = 23;
        topText.textAlign = 'right';
        topText.x = spr.width - topText.width - 18;
        topText.y = spr.height - topText.height;
    };
    return PlayGameScene;
}(egret.DisplayObjectContainer));
__reflect(PlayGameScene.prototype, "PlayGameScene");
