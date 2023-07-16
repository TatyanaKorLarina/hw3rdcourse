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
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./style.css");


var gameLevelEl = document.querySelector(".deck");
var resultGame = document.querySelector(".result");
var finalScreen = document.querySelector(".final-screen");
var gameScreen = document.querySelector(".whole");
var renderCardGame = function () {
    if (topGame) {
        topGame.innerHTML = "";
    }
    if (resultGame) {
        resultGame.innerHTML = "";
        resultGame.classList.remove("result");
    }
    if (finalScreen) {
        finalScreen.innerHTML = "";
        finalScreen.classList.remove("final-screen");
    }
    if (gameScreen) {
        gameScreen.classList.remove("dark-result");
    }
    var cardGameHTML = "\n        <form class=\"game\">\n            <h1 class=\"title\">\u0412\u044B\u0431\u0435\u0440\u0438 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C</h1>\n            <div class=\"levels\">\n\n                <label for=\"1\">\n                    <div class=\"level\">\n                        <input class=\"level-input\" id=\"1\" name=\"level\" value=\"1\" type=\"radio\">\n                        1\n                    </div>\n                </label>\n\n                <label for=\"2\">\n                    <div class=\"level\">\n                        <input class=\"level-input\" id=\"2\" name=\"level\" value=\"2\" type=\"radio\">\n                        2\n                    </div>\n                </label>\n\n                <label for=\"3\">\n                    <div class=\"level\">\n                        <input class=\"level-input\" id=\"3\" name=\"level\" value=\"3\" type=\"radio\">\n                        3\n                    </div>\n                </label>\n\n            </div>\n            <button type=\"submit\" class=\"start-button\" disabled>\u0421\u0442\u0430\u0440\u0442</button>\n        </form>\n        ";
    if (gameLevelEl) {
        gameLevelEl.innerHTML = cardGameHTML;
    }
    var levelEl = document.querySelector(".levels");
    var startButton = document.querySelector(".start-button");
    var buttonsLevel = document.querySelectorAll(".level");
    var _loop_1 = function (button) {
        button.addEventListener("click", function () {
            for (var _i = 0, buttonsLevel_2 = buttonsLevel; _i < buttonsLevel_2.length; _i++) {
                var button_1 = buttonsLevel_2[_i];
                button_1.classList.remove("chosen");
            }
            button.classList.add("chosen");
        });
    };
    for (var _i = 0, buttonsLevel_1 = buttonsLevel; _i < buttonsLevel_1.length; _i++) {
        var button = buttonsLevel_1[_i];
        _loop_1(button);
    }
    function isChosenLevel() {
        if (levelEl && startButton) {
            levelEl.addEventListener("change", function (event) {
                var _a;
                //@ts-ignore
                if ((_a = event.target) === null || _a === void 0 ? void 0 : _a.matches('input[type="radio"]')) {
                    startButton.disabled = false;
                }
            });
        }
    }
    isChosenLevel();
    function chooseLevel() {
        if (startButton && levelEl) {
            startButton.addEventListener("click", function () {
                //@ts-ignore
                var startLevel = levelEl.querySelector('input[type="radio"]:checked').value;
                startGame(startLevel);
            });
        }
    }
    chooseLevel();
};
var createGameCard = function (defaultIcon, flippedCardIcon) {
    var card = document.createElement("div");
    card.classList.add("game-card");
    var notFlippedCardI = document.createElement("img");
    var flippedCardI = document.createElement("img");
    notFlippedCardI.setAttribute("src", "".concat(defaultIcon));
    flippedCardI.setAttribute("src", "".concat(flippedCardIcon));
    card.append(flippedCardI, notFlippedCardI);
    return card;
};
var topGame = document.querySelector(".top");
var startGame = function (startLevel) {
    var firstCard = null;
    var secondCard = null;
    var clickable = true;
    var Interval;
    var seconds = 0;
    var tens = 0;
    var restartButton = document.createElement("button");
    restartButton.textContent = "Начать заново";
    restartButton.classList.add("restart");
    var timer = document.createElement("div");
    var appendSeconds = document.createElement("spent");
    var appendTens = document.createElement("spent");
    appendSeconds.textContent = "00";
    appendTens.textContent = "00";
    appendSeconds.classList.add("timer-count");
    appendTens.classList.add("timer-count");
    var point = document.createElement("spent");
    point.textContent = ".";
    point.classList.add("timer-count");
    timer.append(appendSeconds, point, appendTens);
    var imgResult = document.createElement("img");
    imgResult.setAttribute("src", "static/celebration.png");
    var titleResult = document.createElement("h3");
    titleResult.textContent = "Вы выиграли!";
    titleResult.classList.add("victory");
    var timeResult = document.createElement("h3");
    timeResult.textContent = "Затраченное время!";
    timeResult.classList.add("elapsed-time");
    var gameSection = document.querySelector(".deck");
    var gameTable = document.createElement("div");
    var initCards = generateCardsArray(startLevel);
    var doubleCards = doubleCardsArray(initCards);
    if (gameSection) {
        gameSection.innerHTML = "";
    }
    if (topGame) {
        topGame.innerHTML = "";
    }
    if (resultGame) {
        resultGame.innerHTML = "";
    }
    gameTable.classList.add("game-table");
    gameTable.classList.add("game-table");
    shuffle(doubleCards);
    doubleCards.forEach(function (icon) {
        return gameTable.append(createGameCard("./static/back.svg", icon));
    });
    if (topGame) {
        topGame.append(timer, restartButton);
    }
    if (gameSection) {
        gameSection.append(gameTable);
    }
    var cards = document.querySelectorAll(".game-card");
    restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", renderCardGame);
    function startTimer() {
        tens++;
        if (tens < 9) {
            appendTens.innerHTML = "0" + tens;
        }
        if (tens > 9) {
            appendTens.innerHTML = "" + tens;
            ;
        }
        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = "" + seconds;
        }
    }
    cards.forEach(function (card, index) {
        return card.addEventListener("click", function () {
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
            if (clickable === true &&
                !card.classList.contains("successfully")) {
                card.classList.add("flip");
                if (firstCard === null) {
                    firstCard = index;
                }
                else {
                    if (index !== firstCard) {
                        secondCard = index;
                        clickable = false;
                    }
                }
                if (firstCard !== null &&
                    secondCard !== null &&
                    firstCard !== secondCard) {
                    if (
                    //@ts-ignore
                    cards[firstCard].firstElementChild.src ===
                        //@ts-ignore
                        cards[secondCard].firstElementChild.src) {
                        setTimeout(function () {
                            if (firstCard && secondCard) {
                                cards[firstCard].classList.add("successfully");
                                cards[secondCard].classList.add("successfully");
                            }
                            firstCard = null;
                            secondCard = null;
                            clickable = true;
                            //alert("Вы победили!");
                        }, 500);
                    }
                    else {
                        clearInterval(Interval);
                        //alert("Вы проиграли!");
                        setTimeout(function () {
                            appendSeconds.classList.add("set-timer");
                            appendTens.classList.add("set-timer");
                            point.classList.add("set-timer");
                            imgResult.setAttribute("src", "static/dead.png");
                            titleResult.textContent = "Вы проиграли!";
                            titleResult.classList.add("victory");
                            if (resultGame) {
                                resultGame.classList.add("result");
                                resultGame.append(imgResult, titleResult, timeResult, timer, restartButton);
                            }
                            if (finalScreen && resultGame) {
                                finalScreen.classList.add("final-screen");
                                finalScreen.append(resultGame);
                            }
                            if (gameScreen) {
                                gameScreen.classList.add("dark-result");
                            }
                        }, 500);
                    }
                }
            }
            if (Array.from(cards).every(function (card) {
                return card.className.includes("flip");
            })) {
                clearInterval(Interval);
                setTimeout(function () {
                    appendSeconds.classList.add("set-timer");
                    appendTens.classList.add("set-timer");
                    point.classList.add("set-timer");
                    if (resultGame) {
                        resultGame.classList.add("result");
                        resultGame.append(imgResult, titleResult, timeResult, timer, restartButton);
                    }
                    if (finalScreen && resultGame) {
                        finalScreen.classList.add("final-screen");
                        finalScreen.append(resultGame);
                    }
                    if (gameScreen) {
                        gameScreen.classList.add("dark-result");
                    }
                }, 500);
            }
        });
    });
    setTimeout(function () {
        cards.forEach(function (card) { return card.classList.remove("flip"); });
    }, 5000);
    cards.forEach(function (card) { return card.classList.add("flip"); });
};
var shuffle = function (array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
};
var doubleCardsArray = function (array) {
    return array.reduce(function (res, current) { return res.concat([current, current]); }, []);
};
var generateCardsArray = function (startLevel) {
    var cards = [
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
    cards.sort(function () { return Math.random() - 0.5; });
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
};
var cardsApp = function () {
    renderCardGame();
};
cardsApp();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map