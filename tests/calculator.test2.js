
// tests/calculator-all.test.js - Методы Calculator: сложение, вычитание, корень

// Мокаем DOM
const mockDisplay = {
    value: '',
    style: { color: '' }
};

const mockHistoryElement = {
    innerHTML: ''
};

global.document = {
    getElementById: jest.fn((id) => {
        if (id === 'display') return mockDisplay;
        if (id === 'history') return mockHistoryElement;
        return null;
    }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    createElement: jest.fn(() => ({})),
    querySelector: jest.fn(() => null),
    querySelectorAll: jest.fn(() => []),
    body: { appendChild: jest.fn() }
};

// Импортируем Calculator
const Calculator = require('../script.js');

describe('ТЕСТИРОВАНИЕ МЕТОДОВ CALCULATOR (СЛОЖЕНИЕ, ВЫЧИТАНИЕ, КОРЕНЬ)', () => {
    let calc;
    
    beforeEach(() => {
        jest.clearAllMocks();
        calc = new Calculator();
    });

    describe('1. СЛОЖЕНИЕ ЧЕРЕЗ КАЛЬКУЛЯТОР', () => {
        test('2 + 3 = 5', () => {
            calc.appendNumber('2');
            calc.appendOperator('+');
            calc.appendNumber('3');
            calc.calculate();
            expect(calc.currentInput).toBe('5');
        });

        test('10 + 5 = 15', () => {
            calc.appendNumber('10');
            calc.appendOperator('+');
            calc.appendNumber('5');
            calc.calculate();
            expect(calc.currentInput).toBe('15');
        });

        test('0 + 7 = 7', () => {
            calc.appendNumber('0');
            calc.appendOperator('+');
            calc.appendNumber('7');
            calc.calculate();
            expect(calc.currentInput).toBe('7');
        });

        test('-3 + 5 = 2', () => {
            calc.appendNumber('-3');
            calc.appendOperator('+');
            calc.appendNumber('5');
            calc.calculate();
            expect(calc.currentInput).toBe('2');
        });

        test('0.5 + 0.25 = 0.75', () => {
            calc.appendNumber('0.5');
            calc.appendOperator('+');
            calc.appendNumber('0.25');
            calc.calculate();
            expect(calc.currentInput).toBe('0.75');
        });

        test('последовательное сложение 1+2+3 = 6', () => {
            calc.appendNumber('1');
            calc.appendOperator('+');
            calc.appendNumber('2');
            calc.calculate(); // 3
            calc.appendOperator('+');
            calc.appendNumber('3');
            calc.calculate(); // 6
            expect(calc.currentInput).toBe('6');
        });
    });

    describe('2. ВЫЧИТАНИЕ ЧЕРЕЗ КАЛЬКУЛЯТОР', () => {
        test('10 - 3 = 7', () => {
            calc.appendNumber('10');
            calc.appendOperator('-');
            calc.appendNumber('3');
            calc.calculate();
            expect(calc.currentInput).toBe('7');
        });

        test('5 - 5 = 0', () => {
            calc.appendNumber('5');
            calc.appendOperator('-');
            calc.appendNumber('5');
            calc.calculate();
            expect(calc.currentInput).toBe('0');
        });

        test('0 - 5 = -5', () => {
            calc.appendNumber('0');
            calc.appendOperator('-');
            calc.appendNumber('5');
            calc.calculate();
            expect(calc.currentInput).toBe('-5');
        });

        test('-3 - 2 = -5', () => {
            calc.appendNumber('-3');
            calc.appendOperator('-');
            calc.appendNumber('2');
            calc.calculate();
            expect(calc.currentInput).toBe('-5');
        });

        test('2.5 - 1.5 = 1', () => {
            calc.appendNumber('2.5');
            calc.appendOperator('-');
            calc.appendNumber('1.5');
            calc.calculate();
            expect(calc.currentInput).toBe('1');
        });

        test('вычитание после сложения', () => {
            calc.appendNumber('10');
            calc.appendOperator('+');
            calc.appendNumber('5');
            calc.calculate(); // 15
            calc.appendOperator('-');
            calc.appendNumber('3');
            calc.calculate(); // 12
            expect(calc.currentInput).toBe('12');
        });
    });

    describe('3. КВАДРАТНЫЙ КОРЕНЬ ЧЕРЕЗ КАЛЬКУЛЯТОР', () => {
        test('√0 = 0', () => {
            calc.currentInput = '0';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('0');
        });

        test('√4 = 2', () => {
            calc.currentInput = '4';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('2');
        });

        test('√9 = 3', () => {
            calc.currentInput = '9';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('3');
        });

        test('√25 = 5', () => {
            calc.currentInput = '25';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('5');
        });

        test('√100 = 10', () => {
            calc.currentInput = '100';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('10');
        });

        test('√0.25 = 0.5', () => {
            calc.currentInput = '0.25';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('0.5');
        });

        test('√144 = 12', () => {
            calc.currentInput = '144';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('12');
        });

        test('√(-4) → ошибка', () => {
            calc.currentInput = '-4';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('Ошибка');
            expect(calc.isError).toBe(true);
        });

        test('√(-1) → ошибка', () => {
            calc.currentInput = '-1';
            calc.calculateSquareRoot();
            expect(calc.currentInput).toBe('Ошибка');
            expect(calc.isError).toBe(true);
        });

        test('√ после сложения', () => {
            calc.appendNumber('9');
            calc.appendOperator('+');
            calc.appendNumber('16');
            calc.calculate(); // 25
            calc.calculateSquareRoot(); // √25 = 5
            expect(calc.currentInput).toBe('5');
        });
    });
});

