"use strict";

const levels = [{ level: 1 }, { level: 2 }, { level: 3 }];

const gameLevelEl = document.querySelector(".card-game");

const renderCardGame = () => {
  const cardGameHTML = `
        <div class="container center">
            <form class="game">
                <h3 class="title">Выбери <br>
                сложность</h3>
                <div class="levels">
                    <label for="1"><div class="level level-first"><input id="1" name="item" value="1" type="radio" class="level-input">1</div></label>
                    <label for="2"><div class="level level-second"><input id="2" name="item" value="2" type="radio" class="level-input">2</div></label>
                    <label for="3"><div class="level level-third"><input id="3" name="item" value="3" type="radio" class="level-input">3</div></label>
                </div>
                <button class="start-button" type="submit">Старт</button>
            </form>
        </div>`;

  gameLevelEl.innerHTML = cardGameHTML;

  const levelEl = document.querySelector(".game");
  const startButton = document.querySelector(".start-button");

  const levelButtons = document.querySelectorAll('input[type="radio"]');
  levelButtons.forEach((levelButton) => {
    levelButton.addEventListener("change", () => {
      levelButtons.forEach((button) => {
        if (button !== levelButton) {
          button.parentElement.classList.remove("chosen");
        }
      });
      levelButton.parentElement.classList.add("chosen");
      currentLevel = levelButton;
    });
  });

  levelEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const chosenLevel = document.querySelector('input[type="radio"]:checked');
    if (chosenLevel) {
      currentLevel = chosenLevel.value;
    } else {
      alert("Выберите уровень");
    }
  });

  function chooseLevel() {
    startButton.addEventListener("click", () => {
      let level = document.querySelector('input[type="radio"]:checked').value;

      if (level === "1") {
        gameLevelEl.innerHTML =
          '<a href="index.html">level 1. (Легкий уровень - 6 карточек (3 пары))</a>';
      } else if (level === "2") {
        gameLevelEl.innerHTML =
          '<a href="index.html">level 2. (Средний уровень - 12 карточек (6 пар))</a>';
      } else if (level === "3") {
        gameLevelEl.innerHTML =
          '<a href="index.html">level 3. (Сложный уровень - 18 карточек (9 пар))</a>';
      }
    });
  }
  chooseLevel();
};

renderCardGame();
