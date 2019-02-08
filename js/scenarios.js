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
    (function(){decreaseArbitraryProduce()}),
    51,
    60
)

let fridgeDoorOpenScenario = new Scenario(
    "You left a refrigerator door open over night, and some of your fruit spoiled!",
    (function(){decreaseArbitraryProduce()}),
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

let airConditionerBrokeScenario = new Scenario(
    "The air condition unit that keeps you cool during the summer months broke. You paid $60 of your cash to have it repaired.",
    (function(){decreaseCashByNumber(60)}),
    161,
    170   
)

let politicianBuyUSAScenario = new Scenario(
    "A politician went on TV to criticize vendors for importing produce grown outside the USA. Prices plummit 20% as vendors flock to traditional grocery stores.",
    (function(){decreaseAllMarketPricesByPercentage(20)}),
    171,
    180
)

let healthInspectionScenario = new Scenario(
    "The health department found a strain of dangerous e. coli in the market. They seize all your fruit. You got a measly $10 in compensation.",
    (function(){zeroProduce(); increaseCashByNumber(10);}),
    181,
    200
)

let presidentialVisitScenario = new Scenario(
    "The President came to the market to deliver a speech. He stopped by your stand. Now everyone wants to buy your stuff. Market prices jump 50%.",
    (function(){increaseAllMarketPricesByPercentage(50)}),
    201,
    225
)

let michelleObamaCampaignScenario = new Scenario(
    "Michelle Obama launched a healthy eating campaign, encouraging Americans to shop at farmers markets. All fruit prices jump 30%.",
    (function(){increaseAllMarketPricesByPercentage(30)}),
    226,
    250
)

let advertisingCampaignScenario = new Scenario(
    "The market launched an advertising campaign, increasing demand. All market prices jump 10%.",
    (function(){increaseAllMarketPricesByPercentage(10);}),
    251,
    275
)

let avocadoTruckCustomsScenario = new Scenario(
    "A truck delivering avocados from Mexico gets held-up in customs. Avocado prices skyrocket 50%.",
    (function(){increaseSpecificProducePriceByPercentage(avocados, 50);}),
    276,
    300
)

let carrotTruckCrashScenario = new Scenario(
    "A truck delivering avocados from Mexico gets held-up in customs. Avocado prices skyrocket 50%.",
    (function(){increaseSpecificProducePriceByPercentage(carrots, 23);}),
    301,
    325
)

let appleTruckBreakdownScenario = new Scenario(
    "A truck delivering apples breaks down on the interstate. Prices jump 18%.",
    (function(){increaseSpecificProducePriceByPercentage(apples, 18);}),
    326,
    350
)

let grapeTruckHijackScenario = new Scenario(
    "A truck carrying grapes gets hijacked by bandits. Prices jump 15%.",
    (function(){increaseSpecificProducePriceByPercentage(grapes, 15);}),
    351,
    375
)

let lostPepperTruckScenario = new Scenario(
    "A truck carrying peppers gets lost in a rural area and misses its delivery. Prices jump 20%.",
    (function(){increaseSpecificProducePriceByPercentage(peppers, 20);}),
    376,
    400
)

let carrotDiseaseScenario = new Scenario(
    "A disease ravages carrot farms across the country. Supply decreases. Prices jump 10%.",
    (function(){increaseSpecificProducePriceByPercentage(carrots, 10);}),
    401,
    425
)

let avocadosTariffScenario = new Scenario(
    "The government imposes a tariff on avocados imported from Mexico. Prices jump 15%.",
    (function(){increaseSpecificProducePriceByPercentage(avocados, 15);}),
    426,
    450
)

let appleOrchardPestsScenario = new Scenario(
    "Pests swarm apple orchards in large parts of the country. Prices jump 16%.",
    (function(){increaseSpecificProducePriceByPercentage(apples, 16);}),
    451,
    475
)

let peppersMexicoExportBanScenario = new Scenario(
    "Mexico places an export ban on peppers over a diplomatic dispute. Prices jump 15%.",
    (function(){increaseSpecificProducePriceByPercentage(peppers, 15);}),
    476,
    500
)

let uneventfulDayScenario = new Scenario(
    "Just another uneventful day at the market.",
    (function(){}),
    501,
    700
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

function decreaseArbitraryProduce(){
    //This cycles through all of the users fruit and decreases it by a random amount
    for(let i = 0; i < fruitCollection.length; i++){
        let currentFruit = fruitCollection[i];
        if(currentFruit.userQuantity > 1){
            let amountOfFruitEaten = getRandomNumber(1, currentFruit.userQuantity);
            amountOfFruitEaten = parseInt(amountOfFruitEaten, 10);
            currentFruit.userQuantity -= amountOfFruitEaten;
            updateDisplayedInventory();
        }
    }
}

function decreaseAllMarketPricesByPercentage(percentDecrease){
    for(let i = 0; i < fruitCollection.length; i++){
        let currentFruit = fruitCollection[i];
        let currentFruitMarketPrice = currentFruit.marketPrice;
        currentFruitMarketPrice = currentFruitMarketPrice - (currentFruitMarketPrice * (percentDecrease / 100));
        currentFruitMarketPrice = currentFruitMarketPrice.toFixed(2);
        currentFruitMarketPrice = parseFloat(currentFruitMarketPrice);
        currentFruit.marketPrice = currentFruitMarketPrice;
        updateDisplayedMarketPrice();
    }
}

function increaseAllMarketPricesByPercentage(percentIncrease){
    for(let i = 0; i < fruitCollection.length; i++){
        let produce = fruitCollection[i];
        let oldProducePrice = produce.marketPrice;
        let newProducePrice = oldProducePrice + (oldProducePrice * (percentIncrease / 100));
        newProducePrice = newProducePrice.toFixed(2);
        newProducePrice = parseFloat(newProducePrice);
        produce.marketPrice = newProducePrice;
        updateDisplayedMarketPrice();
    }
}

function increaseSpecificProducePriceByPercentage(produce, percentIncrease){
    let newMarketPrice = produce.marketPrice + (produce.marketPrice * (percentIncrease / 100));
    newMarketPrice = newMarketPrice.toFixed(2);
    newMarketPrice = parseFloat(newMarketPrice);
    produce.marketPrice = newMarketPrice;
    updateDisplayedMarketPrice();
}

function increaseCashByNumber(num){
    cash += num;
    updateDisplayedCash();
}

function zeroProduce(){
    for(let i = 0; i < fruitCollection.length; i++){
        fruitCollection[i].userQuantity = 0;
        updateDisplayedInventory();
    }
}