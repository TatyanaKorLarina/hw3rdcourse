"use strict";

import "./style.css";
const gameLevelEl: any = document.querySelector(".deck");
const resultGame: any = document.querySelector(".result");
const finalScreen: any = document.querySelector(".final-screen");
const gameScreen: any = document.querySelector(".whole");
const renderCardGame: any = () => {
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
    
    

    
    const cardGameHTML: any = `
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
        

    const levelEl: any = document.querySelector(".levels") as HTMLInputElement;
    const startButton: any = document.querySelector(".start-button")as HTMLButtonElement;

    const buttonsLevel: any = document.querySelectorAll(".level");
    for (const button of buttonsLevel) {
        button.addEventListener("click", function () {
            for (const button of buttonsLevel) {
                button.classList.remove("chosen");
            }
            button.classList.add("chosen");
        });
    }

    function isChosenLevel() {
        
        if (levelEl && startButton) {
            levelEl.addEventListener("change", (event: any) => {
                //@ts-ignore
                if (event.target?.matches('input[type="radio"]')) {
                    startButton.disabled = false;
                }
            });
        }
    }
    isChosenLevel();

    function chooseLevel() {
        if (startButton && levelEl) {
        startButton.addEventListener("click", () => {
            //@ts-ignore
            const startLevel = levelEl.querySelector(
                'input[type="radio"]:checked',
                //@ts-ignore
            ).value;

            startGame(startLevel);
        });
    }
    }
    chooseLevel();
};

const createGameCard: any = (defaultIcon: object | string, flippedCardIcon: object | string) => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    const notFlippedCardI: any = document.createElement("img");
    const flippedCardI: any = document.createElement("img");

    notFlippedCardI.setAttribute("src", `${defaultIcon}`);
    flippedCardI.setAttribute("src", `${flippedCardIcon}`);

    card.append(flippedCardI, notFlippedCardI);

    return card;
};

const topGame: any = document.querySelector(".top");
const startGame: any = (startLevel: string) => {
    let firstCard: null | number = null;
    let secondCard: null | number = null;
    let clickable = true;
    let Interval: number| any;
    let seconds = 0;
    let tens = 0;

    const restartButton: any = document.createElement("button");
    restartButton.textContent = "Начать заново";
    restartButton.classList.add("restart");
    const timer: any = document.createElement("div");

    const appendSeconds: any = document.createElement("spent");
    const appendTens: any = document.createElement("spent");
    appendSeconds.textContent = "00";
    appendTens.textContent = "00";
    appendSeconds.classList.add("timer-count");
    appendTens.classList.add("timer-count");
    const point: any = document.createElement("spent");
    point.textContent = ".";
    point.classList.add("timer-count");

    timer.append(appendSeconds, point, appendTens);

    const imgResult: any = document.createElement("img");
    imgResult.setAttribute("src", "static/celebration.png");
    const titleResult: any = document.createElement("h3");
    titleResult.textContent = "Вы выиграли!";
    titleResult.classList.add("victory");
    const timeResult: any = document.createElement("h3");
    timeResult.textContent = "Затраченное время!";
    timeResult.classList.add("elapsed-time");

    const gameSection: any = document.querySelector(".deck");
    const gameTable: any = document.createElement("div");

    const initCards: any = generateCardsArray(startLevel);
    const doubleCards: any = doubleCardsArray(initCards);

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

    doubleCards.forEach((icon: any) =>
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
    cards.forEach((card: any, index: any) =>
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
                        //@ts-ignore
                        cards[firstCard].firstElementChild.src === 
                        //@ts-ignore
                        cards[secondCard].firstElementChild.src) {
                        setTimeout(() => {
                            if (firstCard && secondCard) {
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
                Array.from(cards).every((card: any) =>
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

const shuffle: any = (array: Array<string> | Array<number>) => {
    let currentIndex: any = array.length,
        randomIndex: any;

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

const doubleCardsArray: any = (array: any) =>
    array.reduce((res: any, current: any) => res.concat([current, current]), []);

const generateCardsArray: any = (startLevel: string | Array<number>) => {
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
};
const cardsApp: any = () => {
    renderCardGame();
};

cardsApp();
