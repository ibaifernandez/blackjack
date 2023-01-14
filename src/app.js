// Variables declarations

let symbols = ['♦', '♥', '♠', '♣'];
let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
// let values = ['A', 'J', 'Q', 'K' ]; // This variable has been added for test purposes. When activated, deactivate the original "values" and change number 13 for number 4 in the "assignValue" function
let figures = ['A', 'J', 'Q', 'K']
let figuresWithoutAce = ['10','J', 'Q', 'K']
const computerCards = [];
const playerCards = [];
let playerCurrentCard;
let computerResult = 0;
let playerResult = 0;
let currentSymbol;

// Identification of HTML elements

const computerCardsUl = document.getElementById('computer-card-list'); // Unordered list where computer's cards will be displayed
const playerCardsUl = document.getElementById('player-card-list');     // Unordered list where player's cards will be displayed
const computerDealButton = document.getElementById('deal-computer-button');
const playerDealButton = document.getElementById('deal-player-button');
const stopHereButton = document.getElementById('stop-here');

// Creation and styling of new HTML elements to be added

    // Computer's Accumulated Result

let computerAccumulatedResult = document.createElement('h3');
computerAccumulatedResult.style.textAlign = 'center';
computerAccumulatedResult.style.borderTop = '1px black solid';
computerAccumulatedResult.style.paddingTop = '1rem';

   // Player's Accumulated Result

let playerAccumulatedResult = document.createElement('h3');
playerAccumulatedResult.style.textAlign = 'center';
playerAccumulatedResult.style.borderTop = '1px black solid';
playerAccumulatedResult.style.paddingTop = '1rem';

    // Each one of the player's hands

let playerHand = document.createElement('li');           
playerHand.style.listStyle = 'none';
playerHand.style.fontSize = '32px';
    
// Insert player's name

const askForName = () => {
  let playerName = prompt("What is your name?")
  let playerNameHolder = document.getElementById('player-name');
  playerNameHolder.innerText = playerName;
}

askForName();

// Creation of a card

    // Card's symbol assignment 

const assignSymbol = () => {
  let symbol = symbols[Math.floor(Math.random() * 4)];
  currentSymbol = symbol;
  let topSymbol = document.querySelector('.header-symbol');
  topSymbol.innerText = symbol;
  let bottomSymbol = document.querySelector('.footer-symbol');
  bottomSymbol.innerText = symbol;
  if (symbol === '♦' || symbol === '♥') {
    topSymbol.style.color = 'red';
    bottomSymbol.style.color = 'red';
  } else {
    topSymbol.style.color = 'black';
    bottomSymbol.style.color = 'black';
  }
  return symbol;
}

    // Card's value assignment 

const assignValue = () => {
  let value = values[Math.floor(Math.random() * 4)];
  let mainValue = document.querySelector('.body-symbol');
  mainValue.innerText = value;
  if (currentSymbol === '♦' || currentSymbol === '♥') {
    mainValue.style.color = 'red';
    } else {
      mainValue.style.color = 'black';
    }
    return value;
}

// Dealing of cards

    // Dealing a card for the computer

  const computerDeal = () => {
    let computerCurrentCardSymbol = assignSymbol();
    let computerCurrentCardValue = assignValue();
    computerCards.push(computerCurrentCardValue);
 
    // Input of computer's current hand

    let computerCurrentCard = computerCurrentCardSymbol + computerCurrentCardValue;
    let computerCurrentHand = document.createElement('li');
    computerCurrentHand.style.listStyle = 'none';
    computerCurrentHand.style.fontSize = '32px';
    if (computerCurrentCardSymbol === '♦' || computerCurrentCardSymbol === '♥') {
      computerCurrentHand.style.color = 'red';
    } else {
      computerCurrentHand.style.color = 'black';
    }
    computerCurrentHand.innerText = computerCurrentCard

    // Showing computer's current card

    computerCardsUl.appendChild(computerCurrentHand)

    // Calculating player result

    switch (computerCurrentCardValue) {
      case 'A':
      case '10':
      case 'J':
      case 'Q':
      case 'K':
        computerResult = computerResult + 10;
      break;
      case '2':
        computerResult = computerResult + 2;
      break;
      case '3':
        computerResult = computerResult + 3;
      break;
      case '4':
        computerResult = computerResult + 4;
      break;
      case '5':
        computerResult = computerResult + 5;
      break;
      case '6':
        computerResult = computerResult + 6;
      break;
      case '7':
        computerResult = computerResult + 7;
      break;
      case '8':
        computerResult = computerResult + 8;
      break;
      case '9':
        computerResult = computerResult + 9;
      break;
    }

      if (computerAccumulatedResult.innerText === "") {
        computerAccumulatedResult.id = 'computer-acc-result'
        computerAccumulatedResult.innerText = computerResult;
        computerCardsUl.after(computerAccumulatedResult);
      } else {
        computerAccumulatedResult.innerText = computerResult;
      }

      computerDealButton.style.display = 'none';
      playerDealButton.style.display = 'block';

      if (computerResult > 21) {
        computerAccumulatedResult.innerText = "Da house went over 21 — You win!";
        playerDealButton.style.display = 'none';
        stopHereButton.style.display = 'none';      
        setTimeout(reboot, 5000);
      } else if (computerResult === 21) {
        computerAccumulatedResult.innerText = "Da house's Blackjack! — You lose!";
        playerDealButton.style.display = 'none';
        stopHereButton.style.display = 'none';      
        setTimeout(reboot, 5000);
      }

      if (computerCards.length === 2) {
        for (let i = 0; i < figuresWithoutAce.length; i++) {
          if (computerCards.includes('A')) {
            if (computerCards.includes('10')) {
              computerAccumulatedResult.innerText = "Blackjack! — You win!";
              computerDealButton.style.display = 'none';
              stopHereButton.style.display = 'none';
              setTimeout(reboot, 5000);
            } else if (playerCards.includes(figuresWithoutAce[i])) {
              computerAccumulatedResult.innerText = "Blackjack! — You win!";
              computerDealButton.style.display = 'none';
              stopHereButton.style.display = 'none';
              setTimeout(reboot, 5000);
            }
          }
        }
      

        for (let i = 0; i < figures.length; i++) {
          if (computerCards[0] === computerCards[1] && computerCards.includes(figures[i])) {
            alert("It is time to split!");
            alert("Actually, the 'split' function is not designed, so keep on playing or refresh the page to play from the beginnning!");
          }
        }
      }


    }

    // Dealing a card for the player

    const playerDeal = () => {
      let playerCurrentCardSymbol = assignSymbol();
      let playerCurrentCardValue = assignValue();
      playerCards.push(playerCurrentCardValue);
   
      // Input of player's current hand
  
      let playerCurrentCard = playerCurrentCardSymbol + playerCurrentCardValue;
      let playerCurrentHand = document.createElement('li');
      playerCurrentHand.style.listStyle = 'none';
      playerCurrentHand.style.fontSize = '32px';
      if (playerCurrentCardSymbol === '♦' || playerCurrentCardSymbol === '♥') {
        playerCurrentHand.style.color = 'red';
      }
      playerCurrentHand.innerText = playerCurrentCard
  
      // Showing player's current card
  
      playerCardsUl.appendChild(playerCurrentHand)
  
      // Calculating player result
  
      switch (playerCurrentCardValue) {
        case '2':
          playerResult = playerResult + 2;
        break;
        case '3':
          playerResult = playerResult + 3;
        break;
        case '4':
          playerResult = playerResult + 4;
        break;
        case '5':
          playerResult = playerResult + 5;
        break;
        case '6':
          playerResult = playerResult + 6;
        break;
        case '7':
          playerResult = playerResult + 7;
        break;
        case '8':
          playerResult = playerResult + 8;
        break;
        case '9':
          playerResult = playerResult + 9;
        break;
        default:
          playerResult = playerResult + 10;
      }
      
      if (playerAccumulatedResult.innerText === "") {
        playerAccumulatedResult.id = 'player-acc-result'
        playerAccumulatedResult.innerText = playerResult;
        playerCardsUl.after(playerAccumulatedResult);
      } else {
        playerAccumulatedResult.innerText = playerResult;
      }

      computerDealButton.style.display = 'block';
      playerDealButton.style.display = 'none';
      stopHereButton.style.display = 'flex';


      if (playerResult > 21) {
        playerAccumulatedResult.innerText = "You went over 21 — You lose!";
        computerDealButton.style.display = 'none';
        stopHereButton.style.display = 'none';      
        setTimeout(reboot, 5000);
      } else if (playerResult === 21) {
        playerAccumulatedResult.innerText = "Blackjack for you! — You win!";
        computerDealButton.style.display = 'none';
        stopHereButton.style.display = 'none';
        setTimeout(reboot, 5000);
      }

      if (playerCards.length === 2) {
        for (let i = 0; i < figuresWithoutAce.length; i++) {
          if (playerCards.includes('A')) {
            if (playerCards.includes('10')) {
              playerAccumulatedResult.innerText = "Blackjack! — You win!";
              computerDealButton.style.display = 'none';
              stopHereButton.style.display = 'none';
              setTimeout(reboot, 5000);
            } else if (playerCards.includes(figuresWithoutAce[i])) {
              playerAccumulatedResult.innerText = "Blackjack! — You win!";
              computerDealButton.style.display = 'none';
              stopHereButton.style.display = 'none';
              setTimeout(reboot, 5000);
            }
          }
        }
      

        for (let i = 0; i < figures.length; i++) {
          if (playerCards[0] === playerCards[1] && playerCards.includes(figures[i])) {
            alert("It is time to split!");
            alert("Actually, the 'split' function is not designed, so keep on playing or refresh the page to play from the beginnning!");
          }
        }
      }

    }

const reboot = () => {
  window.location.reload()
}

const stopHere = () => {
  if (computerResult > playerResult) {
    alert("Da House wins... you coward idiot!")
    playerDealButton.style.display = 'none';
    stopHereButton.style.display = 'none';      
    setTimeout(reboot, 5000);
  } else if (computerResult < playerResult) {
    do {
      computerDeal();
      if (computerResult === playerResult) {
        alert("It's a tie... Da House wins!!!");
        playerDealButton.style.display = 'none';
        stopHereButton.style.display = 'none';      
        setTimeout(reboot, 5000);
      } else if (computerResult > playerResult && computerResult <= 21) {
          alert("Da House wins!!!");
          playerDealButton.style.display = 'none';
          stopHereButton.style.display = 'none';      
          setTimeout(reboot, 5000);
        }
    } while (computerResult < playerResult);
  };
  

  }