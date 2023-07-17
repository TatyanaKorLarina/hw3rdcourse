"use strict";

import "./style.css";
//import * as _ from "lodash";
const gameLevelEl = document.querySelector<HTMLElement>(".deck");
const resultGame = document.querySelector<HTMLElement>(".result");
const finalScreen = document.querySelector<HTMLElement>(".final-screen");
const gameScreen = document.querySelector<HTMLElement>(".whole");
const topGame = document.querySelector(".top");
const renderCardGame = () => {
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

        if (gameLevelEl) {
            gameLevelEl.innerHTML = cardGameHTML;
        }
        

        const levelEl: HTMLElement | null = document.querySelector(".levels");
        const startButton: HTMLButtonElement | null = document.querySelector(".start-button");

        const buttonsLevel = document.querySelectorAll(".level");
        for (let button of buttonsLevel as any) {
          button.parentElement?.addEventListener("click", function () {
            for (let button of buttonsLevel as any) {
              button.parentElement?.classList.remove("chosen");
            }
            button.parentElement?.classList.add("chosen");
          });
        }

    function isChosenLevel() {
        
        if (levelEl && startButton) {
            levelEl.addEventListener("change", (event: Event) => {
                const target = event.target as HTMLInputElement;   
                if (target.matches('input[type="radio"]')) {
                    startButton.disabled = false;
                }
            });
        }
    }
    isChosenLevel();

    function chooseLevel() {
        if (startButton && levelEl) {
            startButton.addEventListener("click", () => {
              const checkedInput: HTMLInputElement | null = levelEl.querySelector('input[type="radio"]:checked');
              if (checkedInput) {
                const startLevel = checkedInput.value;
                startGame(startLevel);
              }
            });
          }
        }
        
        chooseLevel();}

const createGameCard = (defaultIcon: object | string, flippedCardIcon: object | string) => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    const notFlippedCardI= document.createElement("img");
    const flippedCardI = document.createElement("img");

    notFlippedCardI.setAttribute("src", `${defaultIcon}`);
    flippedCardI.setAttribute("src", `${flippedCardIcon}`);

    card.append(flippedCardI, notFlippedCardI);

    return card;
};

//const topGame = document.querySelector(".top");
const startGame = (startLevel: string) => {
    let firstCard: number | null = null;
    let secondCard: number | null = null;;
    let clickable = true;
    let Interval: number | NodeJS.Timeout;
    let seconds = 0;
    let tens = 0;

    const restartButton = document.createElement("button");
    restartButton.textContent = "Начать заново";
    restartButton.classList.add("restart");
    const timer = document.createElement("div");

    const appendSeconds = document.createElement("spent");
    const appendTens = document.createElement("spent");
    appendSeconds.textContent = "00";
    appendTens.textContent = "00";
    appendSeconds.classList.add("timer-count");
    appendTens.classList.add("timer-count");
    const point = document.createElement("spent");
    point.textContent = ".";
    point.classList.add("timer-count");

    timer.append(appendSeconds, point, appendTens);

    const imgResult = document.createElement("img");
    imgResult.setAttribute("src", "static/celebration.png");
    const titleResult = document.createElement("h3");
    titleResult.textContent = "Вы выиграли!";
    titleResult.classList.add("victory");
    const timeResult = document.createElement("h3");
    timeResult.textContent = "Затраченное время!";
    timeResult.classList.add("elapsed-time");

    const gameSection = document.querySelector(".deck");
    const gameTable = document.createElement("div");

    const initCards = generateCardsArray(startLevel);
    const doubleCards = doubleCardsArray(initCards);

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

    doubleCards.forEach((icon: string) =>
        gameTable.append(createGameCard("./static/back.svg", icon)),
    );
    if (topGame) {
      topGame.append(timer, restartButton);  
    }
    if (gameSection) {
        gameSection.append(gameTable);
    }
    

    const cards = document.querySelectorAll(".game-card");

    restartButton?.addEventListener("click", renderCardGame);

    function startTimer() {
        tens++;

        if (tens < 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = "" + tens;;
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
                        cards[firstCard].firstElementChild?.outerHTML ===
                        cards[secondCard].firstElementChild?.outerHTML) {
                        setTimeout(() => {
                            if (firstCard  && secondCard) {
                            cards[firstCard].classList.add("successfully");
                            cards[secondCard].classList.add("successfully");
                            }
                            firstCard = null;
                            secondCard = null;
                            clickable = true;
                            //alert("Вы победили!");
                        }, 500);
                    } else {
                        clearInterval(Interval);
                        //alert("Вы проиграли!");
                        setTimeout(() => {
                            appendSeconds.classList.add("set-timer");
                            appendTens.classList.add("set-timer");
                            point.classList.add("set-timer");

                            imgResult.setAttribute("src", "static/dead.png");
                            titleResult.textContent = "Вы проиграли!";
                            titleResult.classList.add("victory");
                            if (resultGame) {
                               resultGame.classList.add("result");
                                resultGame.append(
                                    imgResult,
                                    titleResult,
                                    timeResult,
                                    timer,
                                    restartButton,
                                ); 
                            }
                            if (finalScreen && resultGame) {
                                finalScreen.classList.add("final-screen");
                                finalScreen.append(resultGame);
                            }
                            if (gameScreen){
                                gameScreen.classList.add("dark-result");
                            }
                            
                        }, 500);
                    }
                }
            }
            if (
                Array.from(cards).every((card) =>
                    card.className.includes("flip"),
                )
            ) {
                clearInterval(Interval);
                setTimeout(() => {
                    appendSeconds.classList.add("set-timer");
                    appendTens.classList.add("set-timer");
                    point.classList.add("set-timer");
                    if (resultGame) {
                        resultGame.classList.add("result");
                        resultGame.append(
                            imgResult,
                            titleResult,
                            timeResult,
                            timer,
                            restartButton,
                        );
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
        }),
    );
    setTimeout(() => {
        cards.forEach((card) => card.classList.remove("flip"));
    }, 5000);
    cards.forEach((card) => card.classList.add("flip"));
};

const shuffle = (array: Array<string> | Array<number>) => {
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

const doubleCardsArray = (array: string[]): string[] =>
    array.reduce((res: string[], current: string) => res.concat([current, current]), []);

const generateCardsArray = (startLevel: string | number[]): string[] => {
    const cards: string[]  = [
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
    return cards
};

const cardsApp = () => {
    renderCardGame();
};

cardsApp();
