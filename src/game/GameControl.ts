class GameControl {
    
    // 初始化数据
    public static init() {
        egret.localStorage.clear();
        egret.localStorage.setItem('gameState', '0'); //游戏状态 0:未开始,1:已开始,2:已结束 
        egret.localStorage.setItem('packets', '0'); //已获取红包数
    }
    
    public static startGame() {
        egret.localStorage.setItem("gameState", '1');
    }

    public static endGame() {
        egret.localStorage.setItem("gameState", '2');
    }

    public static getGameState() {
        return Number(egret.localStorage.getItem("gameState"));
    }


    public static addPackets() {
        let packets =  Number(egret.localStorage.getItem("packets"));
        egret.localStorage.setItem("packets", (packets + 1).toString());
        
    }

    public static getPackets() {
        return Number(egret.localStorage.getItem("packets"));
    }
}