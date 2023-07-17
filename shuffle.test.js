const { shuffleCards } = require("./shuffle");
const { expect, it, describe } = require ("@jest/globals");

describe('shuffleCards', () => {
    it('should shuffle the cards array', () => {
      const cards = ['A', 'B', 'C', 'D', 'E'];
      const shuffledCards = shuffleCards(cards);
  
      expect(shuffledCards).not.toEqual(cards);
      expect(shuffledCards).toHaveLength(cards.length);
      expect([...new Set(shuffledCards)]).toEqual(cards);
    });
  });