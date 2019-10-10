/**
 * 游戏固定参数
 */
class GameData {

    public static stageWidth: number = document.documentElement.clientWidth;

    public static stageHeight: number = document.documentElement.clientHeight;

    // 游戏时长(ms)
    public static duration: number = 10000;

    // 红包出现时间间隔(ms)
    public static packetInterval: number = 100;

    // 红包出现几率
    public static packetProbability: number = 0.3;

    // 红包下落速度(px/ms)
    public static speed: number = 0.2;
}