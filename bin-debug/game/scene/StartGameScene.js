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
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        var _this = _super.call(this) || this;
        // this.initView();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    StartGameScene.prototype.initView = function (event) {
        this.addBackground();
        this.addCenterImg();
    };
    // 背景
    StartGameScene.prototype.addBackground = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("redpacket_mainbackground@2x_png");
        this.addChild(bg);
        bg.width = GameData.stageWidth;
        bg.height = GameData.stageHeight;
    };
    StartGameScene.prototype.addCenterImg = function () {
        var stage = new egret.Sprite();
        var img = new egret.Bitmap();
        img.texture = RES.getRes("redpacket_count@2x_png");
        stage.width = img.width / 2;
        stage.height = img.height / 2;
        img.width /= 2;
        img.height /= 2;
        stage.x = (GameData.stageWidth - img.width) / 2;
        stage.y = (GameData.stageHeight - img.height) / 2;
        this.addChild(stage);
        stage.addChild(img);
        var number = new egret.Bitmap();
        number.texture = RES.getRes("redpacket_number3@2x_png");
        number.width /= 2;
        number.height /= 2;
        stage.addChild(number);
        number.x = (stage.width - number.width) / 2;
        number.y = (stage.height - number.height + 100) / 2;
        this.countdown(function (num) {
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
    };
    StartGameScene.prototype.countdown = function (callBack) {
        var _this = this;
        var timer = new egret.Timer(1000, 3);
        timer.addEventListener(egret.TimerEvent.TIMER, function () {
            var num = 3 - timer.currentCount;
            callBack(num);
        }, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
            console.log("开始游戏");
            _this.endCountdown();
            GameControl.startGame();
        }, this);
        timer.start();
    };
    StartGameScene.prototype.endCountdown = function () { };
    ;
    return StartGameScene;
}(egret.DisplayObjectContainer));
__reflect(StartGameScene.prototype, "StartGameScene");
