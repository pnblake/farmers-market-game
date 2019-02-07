///////////////////////////////////////////////////////////
//GAME PLAY VARIABLES
///////////////////////////////////////////////////////////
let day = 1;
let cash = 1000;
let loanAmount = 1000;

let userInventory = {
    numOfCarrots: 0,
    priceOfCarrots: 0,
    numOfAvocados: 0,
    priceOfAvocados: 0,
    numOfApples: 0,
    priceOfApples: 0,
    numOfGrapes: 0,
    priceOfGrapes: 0,
    numOfPeppers: 0,
    priceOfPeppers: 0
}

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


///////////////////////////////////////////////////////////
//DOM VARIABLES
///////////////////////////////////////////////////////////
const messageBox = document.body.querySelector(".message-box");
const displayedCarrotPrice = document.body.querySelector(".carrots-market-price-number");
const displayedAvocadosPrice = document.body.querySelector(".avocados-market-price-number");
const displayedApplesPrice = document.body.querySelector(".apples-market-price-number");
const displayedGrapesPrice = document.body.querySelector(".grapes-market-price-number");
const displayedPeppersPrice = document.body.querySelector(".peppers-market-price-number");
const displayedDay = document.body.querySelector(".day-number");
const displayedCash = document.body.querySelector(".cash-on-hand-number");
const displayedLoan = document.body.querySelector(".outstanding-loan-number");
const buyButton = document.body.querySelector(".buy-button");
const sellButton = document.body.querySelector(".sell-button");
const doNothingButton = document.body.querySelector(".do-nothing-button");
const transactionFruits = document.getElementsByName("fruit");


///////////////////////////////////////////////////////////
//EVENT LISTENERS
///////////////////////////////////////////////////////////
buyButton.addEventListener("click", buyProduce);
sellButton.addEventListener("click", sellProduce);
doNothingButton.addEventListener("click", doNothing);


///////////////////////////////////////////////////////////
//MISCELLANEOUS VARIABLES
///////////////////////////////////////////////////////////
const startupMessage = "Welcome to the farmer's market! You've just followed your dreams and opened your fruit and vegetable stand at the market. <br><br> But you couldn't do it alone – you've had to depend on BankCorp to offer you a loan, and they want to see their money back!   A representative from their office will be visiting you every 7 days to collect $25. <br><br> If you can turn a profit and pay off your loan - you win! However, if your cash box runs dry – you lose! <br><br> Each day, you'll get a scenario here that will drive fluctuations in market prices.  Prices will always vary a little bit, but the news of the day will affect one commodity a lot. <br><br> Each day, you can make one transaction – or decide to do nothing. <br><br> Now, go out there and make some money! BankCorp will be calling soon!";


///////////////////////////////////////////////////////////
//GAMEPLAY FUNCTIONS
//These will be called throughout the game by the main function above
///////////////////////////////////////////////////////////

function newDay(){
    day += 1;
    checkWinLose();
    updateDisplayedDay();
    debtCollector();
    updateDisplayedCash();
    updateDisplayedLoanAmount();
    //Update message board with scenario
    //Update Market Prices GENERAL function here
    //Update Price because of scenario function here

    //Bonus: Make sun set and rise again.
}

function buyProduce() {
    let price = getPriceForTransaction();
    console.log("Price for this transaction: " + price);


    newDay();
}

function sellProduce() {
    newDay();
}

function doNothing(){
    newDay();
}

function getPriceForTransaction() {
    let selectedFruit = getTransactionFruitSelection();
    let selectedFruitObject = matchSelectedFruitToObject(selectedFruit);
    return selectedFruitObject.marketPrice;
}

function getTransactionFruitSelection() {
    //This should return the fruit selected in the radio buttons form
    //This should be reusable for both the buy and sell transactions
    var selectedFruit;
    for (let i = 0; i < transactionFruits.length; i++){
        if (transactionFruits[i].checked){
            selectedFruit = transactionFruits[i].value;
        }
    }
    // console.log("User has selected: " + selectedFruit);
    return selectedFruit;
}

function matchSelectedFruitToObject(selectedFruitName){
    for (let i = 0; i < fruitCollection.length; i++){
        let currentFruit = fruitCollection[i];
        if(currentFruit.name == selectedFruitName){
            // console.log("User has selected an object with name: " + currentFruit.name);
            return currentFruit;
        } 
    }
}

function checkWinLose(){
    if (cash === 0){
        alert("You've gone bankrupt! You lose!");
    } else if (loanAmount === 0) {
        alert("You've paid off your loan! You win!");
    } else {
        return false;
    }
}

function updateMessageBox(newMessage){
    //This function updates the message box with an argued string.
    messageBox.innerHTML = `<p>${newMessage}</p>`;
}

function updateDisplayedDay() {
    displayedDay.textContent = day;
}

function updateDisplayedCash() {
    displayedCash.textContent = cash;
}

function updateDisplayedLoanAmount() {
    displayedLoan.textContent = loanAmount;
}

function debtCollector() {
    if (day % 7 == 0){
        console.log("The debt collector has arrived.");
        loanAmount -= 25;
        cash -= 25;
        return true;
    } else {
        console.log("The debt collector isn't coming today.");
        return false;
    }
}

function getRandomNumber(b, a){
    //Returns a random number between b (minimum) and a (maximum)
    let rando = Math.random() * (a - b) + b;
    // console.log("Random number generated: " + rando);
    return rando;
}

function convertToPriceFormat(num){
    //Converts a number into price format (0.00). NB: It returns a number, and thus won't have a dollar sign.
    let priceString = num.toFixed(2);
    let priceNumber = parseFloat(priceString);
    // console.log("Number converted to price: " + priceNumber);
    return priceNumber;
}

function updateDisplayedMarketPrice(){
    displayedCarrotPrice.textContent = carrots.marketPrice;
    displayedAvocadosPrice.textContent = avocados.marketPrice;
    displayedApplesPrice.textContent = apples.marketPrice;
    displayedGrapesPrice.textContent = grapes.marketPrice;
    displayedPeppersPrice.textContent = peppers.marketPrice;
}


///////////////////////////////////////////////////////////
//STARTUP FUNCTIONS
//These are for when the game first starts
///////////////////////////////////////////////////////////

function getRandomPrice(b, a){
    //Returns a random price between numbers b (min) and a (max).
    let randoNum = getRandomNumber(b, a);
    let randoPrice = convertToPriceFormat(randoNum);
    // console.log("New random price generated: " + randoPrice);
    return randoPrice;
}

function setInitialMarketPrices() {
    //Sets the day-1 market prices for the fruit.
    //NB: It does not edit the price displayed in the DOM.
    for (let i = 0; i < fruitCollection.length; i++){
        let currentFruit = fruitCollection[i];
        // console.log("Currently working with: " + currentFruit.name);
        let min = currentFruit.normMinPrice - (currentFruit.normMinPrice * 0.15);
        let max = currentFruit.normMaxPrice - (currentFruit.normMaxPrice * 0.15);
        let initialPrice = getRandomPrice(min, max);
        currentFruit.marketPrice = initialPrice;
        // console.log(`The price of ${fruitCollection[i].name} is now ${fruitCollection[i].marketPrice}.`);
    }
    updateDisplayedMarketPrice();
    return true;
}


///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
updateMessageBox(startupMessage);
setInitialMarketPrices();
