const { calculate } = require('./calculator');

describe('Calculator', () => {
    test('adds two numbers correctly', () => {
        expect(calculate('add', 5, 3)).toBe(8);
    });

    test('subtracts two numbers correctly', () => {
        expect(calculate('subtract', 10, 4)).toBe(6);
    });

    test('multiplies two numbers correctly', () => {
        expect(calculate('multiply', 6, 2)).toBe(12);
    });

    test('divides two numbers correctly', () => {
        expect(calculate('divide', 10, 2)).toBe(5);
    });

    test('handles division by zero', () => {
        expect(calculate('divide', 10, 0)).toBe('Cannot divide by zero');
    });

    test('handles invalid operations', () => {
        expect(calculate('power', 2, 3)).toBe('Invalid operation');
    });
});

