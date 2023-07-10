"use strict";
//import "./style.css";
const gameLevelEl = document.querySelector(".deck");

const renderCardGame = () => {
    topGame.innerHTML = "";

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

            console.log(startLevel);
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

    const restartButton = document.createElement("button");
    restartButton.textContent = "Начать заново";
    restartButton.classList.add("restart");
    const timer = document.createElement("div");
    timer.textContent = "00.00";
    timer.classList.add("timer-counting");

    const gameSection = document.querySelector(".deck");
    const gameTable = document.createElement("div");

    const initCards = generateCardsArray(startLevel);
    const doubleCards = doubleCardsArray(initCards);

    gameSection.innerHTML = "";
    topGame.innerHTML = "";

    gameTable.classList.add("game-table");

    shuffle(doubleCards);

    doubleCards.forEach((icon) =>
        gameTable.append(createGameCard("./static/back.svg", icon))
    );

    topGame.append(timer, restartButton);
    gameSection.append(gameTable);

    const cards = document.querySelectorAll(".game-card");

    restartButton.addEventListener("click", renderCardGame);

    
    cards.forEach((card, index) =>
        card.addEventListener("click", () => {
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
                            alert("Вы победили!");
                          }, 500);
                    } else {
                      alert("Вы проиграли!");
                      setTimeout(() => {
                            cards[firstCard].classList.remove("flip");
                            cards[secondCard].classList.remove("flip");

                            firstCard = null;
                            secondCard = null;
                            clickable = true;
                          }, 500);
                    }
                }
            }
        })
    );
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
