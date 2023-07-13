/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./style.css");


const gameLevelEl = document.querySelector(".deck");
const resultGame = document.querySelector(".result");
const resultContainer = document.querySelector(".res-container");
const gameScreen = document.querySelector(".whole");
const renderCardGame = () => {
    topGame.innerHTML = "";
    resultGame.innerHTML = "";
    resultContainer.innerHTML = "";

    resultGame.classList.remove("result");
    resultContainer.classList.remove("res-container");
    gameScreen.classList.remove("back-result");
    const cardGameHTML = `
        <form class="game">
            <h1 class="title">Выбери сложность</h1>
            <div class="levels">

                <label for="1">
                    <div class="level">
                        <input class="level-input" id="1" name="level" value="1" type="radio">
                        1
                    </div>
                </label>

                <label for="2">
                    <div class="level">
                        <input class="level-input" id="2" name="level" value="2" type="radio">
                        2
                    </div>
                </label>

                <label for="3">
                    <div class="level">
                        <input class="level-input" id="3" name="level" value="3" type="radio">
                        3
                    </div>
                </label>

            </div>
            <button type="submit" class="start-button" disabled>Старт</button>
        </form>
        `;

    gameLevelEl.innerHTML = cardGameHTML;

    const levelEl = document.querySelector(".levels");
    const startButton = document.querySelector(".start-button");

    
    const buttonsLevel = document.querySelectorAll(".level");
    for (const button of buttonsLevel) {
        button.addEventListener("click", function () {
            for (const button of buttonsLevel) {
                button.classList.remove("chosen");
            }
            this.classList.add("chosen");
        });
    }

    
    function isChosenLevel() {
        levelEl.addEventListener("change", (event) => {
            if (event.target.matches('input[type="radio"]')) {
                startButton.disabled = false;
            }
        });
    }
    isChosenLevel();

    function chooseLevel() {
        startButton.addEventListener("click", () => {
            const startLevel = levelEl.querySelector(
                'input[type="radio"]:checked'
            ).value;

            
            startGame(startLevel);
        });
    }
    chooseLevel();
};

const createGameCard = (defaultIcon, flippedCardIcon) => {
  const card = document.createElement("div");
  card.classList.add("game-card");

  const notFlippedCardI = document.createElement("img");
  const flippedCardI = document.createElement("img");

  notFlippedCardI.setAttribute("src", `${defaultIcon}`);
  flippedCardI.setAttribute("src", `${flippedCardIcon}`);

  card.append(flippedCardI, notFlippedCardI);

  return card;
};

const topGame = document.querySelector(".top");
const startGame = (startLevel) => {
    let firstCard = null;
    let secondCard = null;
    let clickable = true;
    let Interval;
    let seconds = 0;
    let tens = 0;

    const restartButton = document.createElement("button");
    restartButton.textContent = "Начать заново";
    restartButton.classList.add("restart");
    const timer = document.createElement("div");
    //timer.textContent = "00.00";
    //timer.classList.add("timer-counting");
    const appendSeconds = document.createElement("span"); // timer
    const appendTens = document.createElement("span"); // timer
    appendSeconds.textContent = "00";
    appendTens.textContent = "00";
    appendSeconds.classList.add("timer-count");
    appendTens.classList.add("timer-count");
    const dot = document.createElement("span");
    dot.textContent = ".";
    dot.classList.add("timer-count");

    timer.append(appendSeconds, dot, appendTens);

    const imgResult = document.createElement("img");
    imgResult.setAttribute("src", "static/celebration.png");
    const headerResult = document.createElement("h3");
    headerResult.textContent = "Вы выиграли!";
    headerResult.classList.add("win-text");
    const timeResult = document.createElement("h3");
    timeResult.textContent = "Затраченное время!";
    timeResult.classList.add("time-left");

    const gameSection = document.querySelector(".deck");
    const gameTable = document.createElement("div");

    const initCards = generateCardsArray(startLevel);
    const doubleCards = doubleCardsArray(initCards);

    gameSection.innerHTML = "";
    topGame.innerHTML = "";
    resultGame.innerHTML = "";
    gameTable.classList.add("game-table");
    gameTable.classList.add("game-table");

    shuffle(doubleCards);

    doubleCards.forEach((icon) =>
        gameTable.append(createGameCard("./static/back.svg", icon))
    );

    topGame.append(timer, restartButton);
    gameSection.append(gameTable);

    const cards = document.querySelectorAll(".game-card");

    restartButton.addEventListener("click", renderCardGame);
    
    function startTimer() {
        tens++;

        if (tens < 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;
        }

        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
    }
;
    
    cards.forEach((card, index) =>
        card.addEventListener("click", () => {
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
            if (
                clickable === true &&
                !card.classList.contains("successfully")
            ) {
                card.classList.add("flip");

                if (firstCard === null) {
                    firstCard = index;
                } else {
                    if (index !== firstCard) {
                        secondCard = index;
                        clickable = false;
                    }
                }

                if (
                    firstCard !== null &&
                    secondCard !== null &&
                    firstCard !== secondCard
                ) {
                    if (
                        cards[firstCard].firstElementChild.src ===
                        cards[secondCard].firstElementChild.src
                    ) {
                      setTimeout(() => {
                        cards[firstCard].classList.add("successfully");
                        cards[secondCard].classList.add("successfully");

                            firstCard = null;
                            secondCard = null;
                            clickable = true;
                            //alert("Вы победили!");
                          }, 500);
                    } else {
                        clearInterval(Interval);
                      //alert("Вы проиграли!");
                      setTimeout(() => {
                        appendSeconds.classList.add("timer-res");
                        appendTens.classList.add("timer-res");
                        dot.classList.add("timer-res");

                        imgResult.setAttribute("src", "static/dead.png");
                        headerResult.textContent = "Вы проиграли!";
                        headerResult.classList.add("win-text");

                        resultGame.classList.add("result");
                        resultGame.append(
                            imgResult,
                            headerResult,
                            timeResult,
                            timer,
                            restartButton
                        );
                        resultContainer.classList.add("res-container");
                        resultContainer.append(resultGame);
                        gameScreen.classList.add("back-result");
                    }, 500);
                    }
                }
            }
            if (
                Array.from(cards).every((card) =>
                    card.className.includes("flip")
                )
            ) {
                clearInterval(Interval);
                setTimeout(() => {
                    appendSeconds.classList.add("timer-res");
                    appendTens.classList.add("timer-res");
                    dot.classList.add("timer-res");

                    resultGame.classList.add("result");
                    resultGame.append(
                        imgResult,
                        headerResult,
                        timeResult,
                        timer,
                        restartButton
                    );
                    resultContainer.classList.add("res-container");
                    resultContainer.append(resultGame);
                    gameScreen.classList.add("back-result");
                }, 500);
            }
        })
    );
    setTimeout(() => {
        cards.forEach((card) => card.classList.remove("flip"));
        
    }, 5000);
    cards.forEach((card) => card.classList.add("flip"));

};

const shuffle = (array) => {
  let currentIndex = array.length,
      randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
      ];
  }

  return array;
};

const doubleCardsArray = (array) =>
  array.reduce((res, current) => res.concat([current, current]), []);

const generateCardsArray = (startLevel) => {
  const cards = [
    "./static/Spades A.png",
    "./static/Spades K.png",
    "./static/Spades Q.png",
    "./static/Spades J.png",
    "./static/Spades 10.png",
    "./static/Spades 9.png",
    "./static/Spades 8.png",
    "./static/Spades 7.png",
    "./static/Spades 6.png",
    "./static/Hearts A.png",
    "./static/Hearts K.png",
    "./static/Hearts Q.png",
    "./static/Hearts J.png",
    "./static/Hearts 10.png",
    "./static/Hearts 9.png",
    "./static/Hearts 8.png",
    "./static/Hearts 7.png",
    "./static/Hearts 6.png",
    "./static/Diamonds A.png",
    "./static/Diamonds K.png",
    "./static/Diamonds Q.png",
    "./static/Diamonds J.png",
    "./static/Diamonds 10.png",
    "./static/Diamonds 9.png",
    "./static/Diamonds 8.png",
    "./static/Diamonds 7.png",
    "./static/Diamonds 6.png",
    "./static/Clubs A.png",
    "./static/Clubs K.png",
    "./static/Clubs Q.png",
    "./static/Clubs J.png",
    "./static/Clubs 10.png",
    "./static/Clubs 9.png",
    "./static/Clubs 8.png",
    "./static/Clubs 7.png",
    "./static/Clubs 6.png",
  ];
  cards.sort(() => Math.random() - 0.5);
  
  
    
  switch (startLevel) {
    case "1":
      cards.length = 3;
      return cards;
      
    case "2":
      cards.length = 6;
      return cards;
    case "3":
      cards.length = 9;
      return cards;
    default:
        break;
  }
} 
;

const cardsApp = () => {
  renderCardGame();
};

cardsApp();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map