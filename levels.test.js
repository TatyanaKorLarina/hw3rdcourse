const { it, expect } = require("@jest/globals");

function game() {
    this.cards = [];
}

function cardArray(cardsNum) {
    return Math.floor(Math.random() * cardsNum);
}
const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
function startLevel(cardsNum, array) {
    for (let i = 1; i <= cardsNum; i++) {
        array.push([
            cards[cardArray(cards.length)],
            
        ]);
    }
}

it("should add 6 elements to object", () => {
    const level = new game();
    startLevel(6, level.cards);
    expect(level.cards).toHaveLength(6);
});

it("should add 12 elements to object", () => {
    const level = new game();
    startLevel(12, level.cards);
    expect(level.cards).toHaveLength(12);
});

it("should add 18 elements to object", () => {
    const level = new game();
   startLevel(18, level.cards);
   expect(level.cards).toHaveLength(18);
});