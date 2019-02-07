//GAME PLAY VARIABLES
let day = 1;
let cash = 1000;
let loanAmount = 1000;

class Fruit {
    constructor(name, userQuantity, userBoughtPrice, marketPrice, normMinPrice, normMaxPrice){
        this.name = name;
        this.userQuantity = userQuantity;
        this.userBoughtPrice = userBoughtPrice;
        this.marketPrice = marketPrice;
        this.normMinPrice = normMinPrice;
        this.normMaxPrice = normMaxPrice;
    }
}

let carrots = new Fruit("Carrots", 0, 0.00, 0.00, 0.50, 3.00);
let avocados = new Fruit("Avocados", 0, 0.00, 0.00, 2.00, 6.00);
let apples = new Fruit("Apples", 0, 0.00, 0.00, 1.50, 3.50);
let grapes = new Fruit("Grapes", 0, 0.00, 0.00, 3.00, 5.00);
let peppers = new Fruit("Peppers", 0, 0.00, 0.00, 0.75, 3.50);
let fruitCollection = [carrots, avocados, apples, grapes, peppers];
//END GAMEPLAY VARIABLES


//DOM VARIABLES
const messageBox = document.body.querySelector(".message-box");
//END DOM VARIABLES

//MISCELLANEOUS VARIABLES
const startupMessage = "Welcome to the farmer's market! You've just followed your dreams and opened your fruit and vegetable stand at the market. <br><br> But you couldn't do it alone – you've had to depend on BankCorp to offer you a loan, and they want to see their money back!   A representative from their office will be visiting you every 7 days to collect $25. <br><br> If you can turn a profit and pay off your loan - you win! However, if your cash box runs dry – you lose! <br><br> Each day, you'll get a scenario here that will drive fluctuations in market prices.  Prices will always vary a little bit, but the news of the day will affect one commodity a lot. <br><br> Each day, you can make one transaction – or decide to do nothing. <br><br> Now, go out there and make some money! BankCorp will be calling soon!";
//END MISCELLANEOUS VARIABLES


//THIS IS THE MAIN FUNCTION IN WHICH THE GAME WILL RUN.
function farmersMarket() {
    console.log("New game started.");

    //Update the message box with an initial message.
    updateMessageBox(startupMessage);

    //Set the initial market prices 

}



//
//GAMEPLAY FUNCTIONS
//These will be called throughout the game by the main function above
//
function updateMessageBox(newMessage){
    //This function updates the message box with an argued string.
    messageBox.innerHTML = `<p>${newMessage}</p>`;
}

function getRandomNumber(b, a){
    //Returns a random number between b (minimum) and a (maximum)
    let rando = Math.random() * (a - b) + b;
    console.log("Random number generated: " + rando);
    return rando;
}

function convertToPriceFormat(num){
    //Converts a number into price format (0.00). NB: It returns a number, and thus won't have a dollar sign.
    let priceString = num.toFixed(2);
    let priceNumber = parseFloat(priceString);
    console.log("Number converted to price: " + priceNumber);
    return priceNumber;
}


//
//STARTUP FUNCTIONS
//These are for when the game first starts
//

function getRandomPrice(b, a){
    //Returns a random price between numbers b (min) and a (max).
    let randoNum = getRandomNumber(b, a);
    let randoPrice = convertToPriceFormat(randoNum);
    console.log("New random price generated: " + randoPrice);
    return randoPrice;
}

function setInitialMarketPrices() {
    //Sets the day-1 market prices for the fruit.
    //NB: It does not edit the price displayed in the DOM.
    for (let i = 0; i < fruitCollection.length; i++){
        let currentFruit = fruitCollection[i];
        console.log("Currently working with: " + currentFruit.name);
        let min = currentFruit.normMinPrice - (currentFruit.normMinPrice * 0.15);
        let max = currentFruit.normMaxPrice - (currentFruit.normMaxPrice * 0.15);
        let initialPrice = getRandomPrice(min, max);
        currentFruit.marketPrice = initialPrice;
        console.log(`The price of ${fruitCollection[i].name} is now ${fruitCollection[i].marketPrice}.`);
    }
    //NEEDS call to DOM EDIT FUNCTION HERE.
    return true;
}


///////////////////////
farmersMarket();

setInitialMarketPrices();