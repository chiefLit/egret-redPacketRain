var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameControl = (function () {
    function GameControl() {
    }
    // 初始化数据
    GameControl.init = function () {
        egret.localStorage.clear();
        egret.localStorage.setItem('gameState', '0'); //游戏状态 0:未开始,1:已开始,2:已结束 
        egret.localStorage.setItem('packets', '0'); //已获取红包数
    };
    GameControl.startGame = function () {
        egret.localStorage.setItem("gameState", '1');
    };
    GameControl.endGame = function () {
        egret.localStorage.setItem("gameState", '2');
    };
    GameControl.getGameState = function () {
        return Number(egret.localStorage.getItem("gameState"));
    };
    GameControl.addPackets = function () {
        var packets = Number(egret.localStorage.getItem("packets"));
        egret.localStorage.setItem("packets", (packets + 1).toString());
    };
    GameControl.getPackets = function () {
        return Number(egret.localStorage.getItem("packets"));
    };
    return GameControl;
}());
__reflect(GameControl.prototype, "GameControl");
