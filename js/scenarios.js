let allScenarios = [];

class Scenario {
    constructor (scenarioMessage, scenarioFunc, propDown, probUp){
        this.scenarioMessage = scenarioMessage;
        this.scenarioFunc = scenarioFunc;
        this.probDown = propDown;
        this.probUp = probUp;
        allScenarios.push(this);
    }
}

let marketFireScenario = new Scenario(
    "A catastropic fire has razed the entire market. You lose (and so does everyone else).",
    (function(){cash = 0; updateDisplayedCash(); checkWinLose();}),
    0,
    5
)

let spaceHeaterFireScenario = new Scenario(
    "You left a small space heater on when you close for the day, and it started a fire. You pay 20% of your current cash on hand to repair the damage and replace the heater.",
    (function(){decreaseCashByPercentage(20);}), 
    6, 
    20
)

let thievesScenario = new Scenario(
    "Uh-oh! Thieves broke into your stand over night and raided the cash box. You lose 12% of your current cash on hand.",
    (function(){decreaseCashByPercentage(12);}),
    21,
    40
)

let basketballTeamScenario = new Scenario(
    "A local middle school basketball team asked you to donate money to help them travel to the state tournament. You give $50.",
    (function(){decreaseCashByNumber(50);}),
    41,
    50
)



console.log(allScenarios);




///////////////////////////////////////////////////////////
//Functions to be called in the above scenarios          //
///////////////////////////////////////////////////////////

function decreaseCashByPercentage(percentDecrease){
    //The argument for this should be a positive integer - e.g. '20' for 20% decrease
    percentDecrease = percentDecrease / 100;
    cash = cash - (cash * percentDecrease);
    updateDisplayedCash();
}

function decreaseCashByNumber(num){
    //The argment for this should be a positive real number
    cash -= num;
    updateDisplayedCash();
}