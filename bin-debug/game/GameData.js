var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏固定参数
 */
var GameData = (function () {
    function GameData() {
    }
    GameData.stageWidth = document.documentElement.clientWidth;
    GameData.stageHeight = document.documentElement.clientHeight;
    // 游戏时长(ms)
    GameData.duration = 10000;
    // 红包出现时间间隔(ms)
    GameData.packetInterval = 100;
    // 红包出现几率
    GameData.packetProbability = 0.3;
    // 红包下落速度(px/ms)
    GameData.speed = 0.2;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
