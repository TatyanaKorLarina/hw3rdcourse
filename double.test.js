const { it, expect } = require("@jest/globals");
const doubleCardsArray = (array) =>
    array.reduce((res, current) => res.concat([current, current]), []);

it("should double array", () => {
    const testArray = ['A', 'B', 'C'];
    const expectedDouble = doubleCardsArray(testArray);
    expect(testArray).not.toEqual(expectedDouble);
});