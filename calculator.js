function calculate(operation, a, b) {
    switch(operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            return b === 0 ? 'Cannot divide by zero' : a / b;
        default:
            return 'Invalid operation';
    }
}

// Example usage:
const result = calculate('add', 5, 3); // Returns 8 