function shuffleCards(cards) {
  const shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
}

const { expect, it, describe } = require("@jest/globals");

describe('shuffleCards', () => {
  it('should shuffle the cards array', () => {
    const cards = ['A', 'B', 'C', 'D', 'E'];
    const shuffledCards = shuffleCards(cards);

    expect(shuffledCards).not.toEqual(cards);
    expect(shuffledCards).toHaveLength(cards.length);
    expect(shuffledCards).toEqual(expect.arrayContaining(cards));
  });
});