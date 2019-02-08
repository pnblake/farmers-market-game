//NB: The English-language words "fruit" and "produce" are used interchangeably here.

///////////////////////////////////////////////////////////
//GAME PLAY VARIABLES
///////////////////////////////////////////////////////////
let day = 1;
let cash = 1000;
let loanAmount = 1000;
// let networth = 1000;

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
let avocados = new Fruit("Avocados", 0, 0.00, 0.00, 1.00, 6.50);
let apples = new Fruit("Apples", 0, 0.00, 0.00, 1.00, 4.50);
let grapes = new Fruit("Grapes", 0, 0.00, 0.00, 1.25, 6.00);
let peppers = new Fruit("Peppers", 0, 0.00, 0.00, 0.75, 3.50);

let fruitCollection = [carrots, avocados, apples, grapes, peppers];


///////////////////////////////////////////////////////////
//DOM VARIABLES                                          //
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
const carrotsInventoryNumber = document.querySelector(".carrots-inventory-number");
const avocadosInventoryNumber = document.querySelector(".avocados-inventory-number");
const applesInventoryNumber = document.querySelector(".apples-inventory-number");
const grapesInventoryNumber = document.querySelector(".grapes-inventory-number");
const peppersInventoryNumber = document.querySelector(".peppers-inventory-number");
const carrotsBoughtPrice = document.querySelector(".carrots-bought-price");
const avocadosBoughtPrice = document.querySelector(".avocados-bought-price");
const applesBoughtPrice = document.querySelector(".apples-bought-price");
const grapesBoughtPrice = document.querySelector(".grapes-bought-price");
const peppersBoughtPrice = document.querySelector(".peppers-bought-price");
const quantityInputField = document.querySelector(".quantity-input");
// const displayedNetworth = document.body.querySelector(".networth-number");

///////////////////////////////////////////////////////////
//EVENT LISTENERS                                        //
///////////////////////////////////////////////////////////
buyButton.addEventListener("click", buyProduce);
sellButton.addEventListener("click", sellProduce);
doNothingButton.addEventListener("click", doNothing);


///////////////////////////////////////////////////////////
//MISCELLANEOUS VARIABLES                                //
///////////////////////////////////////////////////////////
const startupMessage = "Welcome to the farmer's market! You've just followed your dreams and opened your fruit and vegetable stand at the market. <br><br> But you couldn't do it alone – you've had to depend on BankCorp to offer you a loan, and they want to see their money back!   A representative from their office will be visiting you every 7 days to collect $25. <br><br> If you can turn a profit and pay off your loan - you win! However, if your cash box runs dry – you lose! <br><br> Each day, you'll get a scenario here that will drive fluctuations in market prices.  Prices will always vary a little bit, but the news of the day will affect one commodity a lot. <br><br> Each day, you can make one transaction – or decide to do nothing. <br><br> Now, go out there and make some money! BankCorp will be calling soon!";


///////////////////////////////////////////////////////////
//GAMEPLAY FUNCTIONS
//These will be called throughout the game by the main function above
///////////////////////////////////////////////////////////

function newDay(){
    day += 1;
    checkWinLose();
    debtCollector();
    generalMarketVolatility();
    loadScenario();
    // updateNetworth();
    updateDisplayedDay();
    updateDisplayedCash();
    updateDisplayedLoanAmount();
    updateDisplayedInventory();
    updateDisplayedBoughtPrice();
    updateDisplayedMarketPrice();

    //Bonus: Make sun set and rise again.
}

function loadScenario(){
    let rando = parseInt(getRandomNumber(0, 1000), 10);
    // console.log(rando);

    for(let i = 0; i < allScenarios.length; i++){
        let currentScenario = allScenarios[i];
        if(rando >= currentScenario.probDown && rando <= currentScenario.probUp){
            // console.log(currentScenario.scenarioMessage);
            updateMessageBox(currentScenario.scenarioMessage);
            currentScenario.scenarioFunc();
        }
    }
}

function buyProduce() {
    let produceObject = getTransactionProduce();
    let producePrice = produceObject.marketPrice;
    let transactionQuantity = getTransactionQuantity();
    let totalPrice = producePrice * transactionQuantity;
    totalPrice = totalPrice.toFixed(2);
    totalPrice = parseFloat(totalPrice);
    console.log(`BUY ORDER: The user has placed a buy order for ${transactionQuantity} ${produceObject.name} at a price of ${producePrice} each, or ${totalPrice} in total.`);
    
    //Check to see if the user has the money to do this.
    if(totalPrice > cash){
        alert("You don't have the cash for this transaction.");
        console.log("Transaction canceled.");
        return;
    }

    //Update user's bought price for this.
    if (produceObject.userBoughtPrice !== 0){
        // console.log("User already has some carrots, so we'll need to do a weighted-average of the prices.");
        let weightedAverage = (((produceObject.userQuantity * produceObject.userBoughtPrice) + (transactionQuantity * producePrice)) / (produceObject.userQuantity + transactionQuantity));
        produceObject.userBoughtPrice = weightedAverage;
    } else if (produceObject.userQuantity == 0){
        // console.log("User doesn't have any of this produce, so we can just stick the unit market price in.");
        produceObject.userBoughtPrice = producePrice;
    } else {
        // console.log("There's a logic failure in the buyProduce() function.");
    }

    //Update user's quantity for this produce.
    //NB: This needs to go after the price weighting above, in order for the price-weighting function to work correctly
    produceObject.userQuantity += transactionQuantity;

    //Update the user's cash-on-hand
    // console.log("BUY: Total price " + totalPrice);
    cash -= totalPrice;

    newDay();
}

function sellProduce() {
    let produceObject = getTransactionProduce();
    let producePrice = produceObject.marketPrice;
    let transactionQuantity = getTransactionQuantity();
    let totalPrice = producePrice * transactionQuantity;
    totalPrice = totalPrice.toFixed(2);
    totalPrice = parseFloat(totalPrice);
    console.log(`SELL ORDER: The user has placed a sell order for ${transactionQuantity} ${produceObject.name} at a price of ${producePrice} each, or ${totalPrice} in total.`);

    //Check to see if the user has the fruit to sell
    if(transactionQuantity > produceObject.userQuantity){
        alert(`You don't have that many ${produceObject.name} to sell.`);
        console.log("Transaction canceled.");
        return;
    }

    //Update user's quantity
    produceObject.userQuantity -= transactionQuantity;

    //Update user's cash
    cash += totalPrice;

    newDay();
}

function doNothing(){
    newDay();
}

function getTransactionProduce() {
    //This should return the object corresponding to the fruit selected in the radio buttons form
    //This should be reusable for both the buy and sell transactions
    let selectedProduceFormValue;
    for (let i = 0; i < transactionFruits.length; i++){
        if (transactionFruits[i].checked){
            selectedProduceFormValue = transactionFruits[i].value;
        }
    }
    //Now let's match the form value to the actual object
    for (let i = 0; i < fruitCollection.length; i++){
        let currentFruitObject = fruitCollection[i];
        if(currentFruitObject.name == selectedProduceFormValue){
            return currentFruitObject;
        }
    }
}

function getTransactionQuantity() {
    let quantity = parseInt(quantityInputField.value, 10);
    return quantity;
}

function checkWinLose(){
    if (cash <= 0){
        alert("You've gone bankrupt! You lose!");
    } else if (loanAmount <= 0) {
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
    displayedCash.textContent = cash.toFixed(2);
}

function updateDisplayedLoanAmount() {
    displayedLoan.textContent = loanAmount;
}

function updateDisplayedMarketPrice(){
    displayedCarrotPrice.textContent = carrots.marketPrice;
    displayedAvocadosPrice.textContent = avocados.marketPrice;
    displayedApplesPrice.textContent = apples.marketPrice;
    displayedGrapesPrice.textContent = grapes.marketPrice;
    displayedPeppersPrice.textContent = peppers.marketPrice;
}

function updateDisplayedInventory(){
    //This updates the displayed inventory numbers
    carrotsInventoryNumber.textContent = carrots.userQuantity;
    avocadosInventoryNumber.textContent = avocados.userQuantity;
    applesInventoryNumber.textContent = apples.userQuantity;
    grapesInventoryNumber.textContent = grapes.userQuantity;
    peppersInventoryNumber.textContent = peppers.userQuantity;
}

function updateDisplayedBoughtPrice(){
    //This updates the displayed bought price in the inventory section
    carrotsBoughtPrice.textContent = carrots.userBoughtPrice.toFixed(2);
    avocadosBoughtPrice.textContent = avocados.userBoughtPrice.toFixed(2);
    applesBoughtPrice.textContent = apples.userBoughtPrice.toFixed(2);
    grapesBoughtPrice.textContent = grapes.userBoughtPrice.toFixed(2);
    peppersBoughtPrice.textContent = peppers.userBoughtPrice.toFixed(2);
}

function generalMarketVolatility(){
    for (let i = 0; i < fruitCollection.length; i++){
        let currentProduce = fruitCollection[i];
        let min = currentProduce.normMinPrice + (currentProduce.normMinPrice * 0.5);
        let max = currentProduce.normMaxPrice - (currentProduce.normMaxPrice * 0.5);
        // console.log("Current produce: " + currentProduce.name);
        // console.log("Min: " + min);
        // console.log("Max: " + max);
        let newPrice = getRandomPrice(min, max);
        currentProduce.marketPrice = newPrice;
        updateDisplayedMarketPrice();
    }

    // setInitialMarketPrices();  //Disable the above and activate this for more market volatility.
}

function debtCollector() {
    if (day % 7 == 0){
        console.log("The debt collector has arrived.");
        loanAmount -= 25;
        cash -= 25;
        return true;
    } else {
        // console.log("The debt collector isn't coming today.");
        return false;
    }
}

function getRandomNumber(b, a){
    //Returns a random number between b (minimum) and a (maximum)
    let rando = Math.random() * (a - b) + b;
    return rando;
}

function convertToPriceFormat(num){
    //Converts a number into price format (0.00). NB: It returns a number, and thus won't have a dollar sign.
    let priceString = num.toFixed(2);
    let priceNumber = parseFloat(priceString);
    return priceNumber;
}

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
        let max = currentFruit.normMaxPrice + (currentFruit.normMaxPrice * 0.15);
        let initialPrice = getRandomPrice(min, max);
        currentFruit.marketPrice = initialPrice;
        // console.log(`The price of ${fruitCollection[i].name} is now ${fruitCollection[i].marketPrice}.`);
    }
    return true;
}

// function updateNetworth(){
//     let produceInventoryWorth = 0;
//     for (let i = 0; i < fruitCollection.length; i++){
//         let currentProduce = fruitCollection[i];
//         let perUnitCost = currentProduce.userBoughtPrice;
//         let userAmount = currentProduce.userQuantity;
//         let thisProduceWorth = perUnitCost * userAmount;
//         console.log(`Just checked ${currentProduce.name}, and it's worth ${thisProduceWorth}`);
//         produceInventoryWorth += thisProduceWorth;
//     }
//     console.log("Produce inventory worth: " + produceInventoryWorth);
//     networth = produceInventoryWorth + cash;
//     console.log("Networth: " + networth);

//     //Update displayed networth
//     displayedNetworth.textContent = networth;
//     return true;
// }


///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// updateMessageBox(startupMessage);
setInitialMarketPrices();
updateDisplayedMarketPrice();
// updateNetworth();