class Scenario {
    constructor (scenarioMessage, scenarioFunc, propDown, probUp){
        this.scenarioMessage = scenarioMessage;
        this.scenarioFunc = scenarioFunc;
        this.probDown = propDown;
        this.probUp = probUp;
    }
}

let marketFire = new Scenario(
    "A catastropic fire has razed the entire market. You lose (and so does everyone else).",
    (function(){cash = 0; updateDisplayedCash(); checkWinLose();}),
    0,
    5
)