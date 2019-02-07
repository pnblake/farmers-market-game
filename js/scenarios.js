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

let ratsScenario = new Scenario(
    "Rats snuck in to your stand over night and ate some of your fruit!",
    (function(){decreaseArbitraryFruit()}),
    51,
    60
)

let fridgeDoorOpenScenario = new Scenario(
    "You left a refrigerator door open over night, and some of your fruit spoiled!",
    (function(){decreaseArbitraryFruit()}),
    61,
    65
)

let standVandalizedScenario = new Scenario(
    "Your stand was vandalized over night, and you have to pay to have it repainted. You lose $50.",
    (function(){decreaseCashByNumber(50)}),
    66,
    75
)

let standBesideDamagedScenario = new Scenario(
    "The stand beside you was damaged over night. You like the vendor, so you offer 10% of your cash to help them repair it.",
    (function(){decreaseCashByPercentage(10)}),
    76,
    80
)

let influencerScenario = new Scenario(
    "You worry that your great produce isn't viral enough, so you paid $50 to an influencer to 'gram your stand. #FarmerFestival",
    (function(){decreaseCashByNumber(50)}),
    81,
    90
)

let bizLicenseScenario = new Scenario(
    "Your business license needed to be renewed, you pay a 20% tax.",
    (function(){decreaseCashByPercentage(20)}),
    91,
    100
)

let taxOnProduceVendorsScenario = new Scenario(
    "The government passed a law putting a one-time tax on all produce vendors. You pay 10% of your current cash.",
    (function(){decreaseCashByPercentage(10)}),
    101,
    110
)

let healthInspectorsScenario = new Scenario(
    "Health inspectors came by your stand and find that you're not in compliance with some regulations. You're fined 15%.",
    (function(){decreaseCashByPercentage(15)}),
    111,
    120
)

let boardVoteRenovationScenario = new Scenario(
    "The board that oversees the market voted to renovate parts of the market. They collect 14% of your cash to help pay for this.",
    (function(){decreaseCashByPercentage(14)}),
    121,
    130
)

let coldBuyHeaterScenario = new Scenario(
    "It's too cold in your stand during the winter months, so you paid $25 for a space heater.",
    (function(){decreaseCashByNumber(25)}),
    131,
    140
)

let mafiaProtection = new Scenario(
    "A local mafia member demanded protection money, you pay 18% of your current cash.",
    (function(){decreaseCashByPercentage(18)}),
    141,
    150
)

let youthGangScenario = new Scenario(
    "A youth gang sneaks up on your when you're closing late. They took 9% of your current cash.",
    (function(){decreaseCashByPercentage(9)}),
    151,
    160
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

function decreaseArbitraryFruit(){
    //This cycles through all of the users fruit and decreases it by a random amount
    for(let i = 0; i < fruitCollection.length; i++){
        let currentFruit = fruitCollection[i];
        console.log()
        if(currentFruit.userQuantity > 1){
            let amountOfFruitEaten = getRandomNumber(1, currentFruit.userQuantity);
            amountOfFruitEaten = parseInt(amountOfFruitEaten, 10);
            currentFruit.userQuantity -= amountOfFruitEaten;
            updateDisplayedInventory();
        }
    }
}