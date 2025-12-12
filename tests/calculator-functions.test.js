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

const Calculator = require('../script.js');

describe('ТЕСТИРОВАНИЕ КАЛЬКУЛЯТОРА (деление и умножение)', () => {
    let calc;
    
    beforeEach(() => {
        jest.clearAllMocks();
        calc = new Calculator();
    });

    describe('ДЕЛЕНИЕ', () => {
        test('10 / 2 = 5', () => {
            calc.previousInput = '10';
            calc.currentInput = '2';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('5');
        });

        test('5 / 2 = 2.5', () => {
            calc.previousInput = '5';
            calc.currentInput = '2';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('2.5');
        });

        test('100 / 4 = 25', () => {
            calc.previousInput = '100';
            calc.currentInput = '4';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('25');
        });

        test('1 / 3 ≈ 0.333', () => {
            calc.previousInput = '1';
            calc.currentInput = '3';
            calc.operator = '/';
            calc.calculate();
            expect(parseFloat(calc.currentInput)).toBeCloseTo(0.333, 3);
        });

        test('-10 / 2 = -5', () => {
            calc.previousInput = '-10';
            calc.currentInput = '2';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('-5');
        });

        test('10 / -2 = -5', () => {
            calc.previousInput = '10';
            calc.currentInput = '-2';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('-5');
        });

        test('-10 / -2 = 5', () => {
            calc.previousInput = '-10';
            calc.currentInput = '-2';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('5');
        });

        test('0 / 5 = 0', () => {
            calc.previousInput = '0';
            calc.currentInput = '5';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('0');
        });

        test('деление на ноль → ошибка', () => {
            calc.previousInput = '10';
            calc.currentInput = '0';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('Деление на ноль');
            expect(calc.isError).toBe(true);
        });

        test('0 / 0 → ошибка', () => {
            calc.previousInput = '0';
            calc.currentInput = '0';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('Деление на ноль');
            expect(calc.isError).toBe(true);
        });

        test('0.5 / 0.25 = 2', () => {
            calc.previousInput = '0.5';
            calc.currentInput = '0.25';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('2');
        });

        test('1000000 / 1000 = 1000', () => {
            calc.previousInput = '1000000';
            calc.currentInput = '1000';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('1000');
        });

        test('деление на 1', () => {
            calc.previousInput = '42';
            calc.currentInput = '1';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('42');
        });

        test('деление на -1', () => {
            calc.previousInput = '42';
            calc.currentInput = '-1';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('-42');
        });

        test('деление на само себя = 1', () => {
            calc.previousInput = '7';
            calc.currentInput = '7';
            calc.operator = '/';
            calc.calculate();
            expect(calc.currentInput).toBe('1');
        });
    });

    describe('УМНОЖЕНИЕ', () => {
        test('3 * 4 = 12', () => {
            calc.previousInput = '3';
            calc.currentInput = '4';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('12');
        });

        test('5 * 7 = 35', () => {
            calc.previousInput = '5';
            calc.currentInput = '7';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('35');
        });

        test('10 * 10 = 100', () => {
            calc.previousInput = '10';
            calc.currentInput = '10';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('100');
        });

        test('5 * 0 = 0', () => {
            calc.previousInput = '5';
            calc.currentInput = '0';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('0');
        });

        test('0 * 7 = 0', () => {
            calc.previousInput = '0';
            calc.currentInput = '7';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('0');
        });

        test('3 * -4 = -12', () => {
            calc.previousInput = '3';
            calc.currentInput = '-4';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('-12');
        });

        test('-3 * 4 = -12', () => {
            calc.previousInput = '-3';
            calc.currentInput = '4';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('-12');
        });

        test('-3 * -4 = 12', () => {
            calc.previousInput = '-3';
            calc.currentInput = '-4';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('12');
        });

        test('0.5 * 0.5 = 0.25', () => {
            calc.previousInput = '0.5';
            calc.currentInput = '0.5';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('0.25');
        });

        test('4 * 0.25 = 1', () => {
            calc.previousInput = '4';
            calc.currentInput = '0.25';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('1');
        });

        test('1000 * 1000 = 1000000', () => {
            calc.previousInput = '1000';
            calc.currentInput = '1000';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('1000000');
        });

        test('9999 * 8888 = 88871112', () => {
            calc.previousInput = '9999';
            calc.currentInput = '8888';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('88871112');
        });

        test('42 * 1 = 42', () => {
            calc.previousInput = '42';
            calc.currentInput = '1';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('42');
        });

        test('42 * -1 = -42', () => {
            calc.previousInput = '42';
            calc.currentInput = '-1';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('-42');
        });

        test('12 * 12 = 144', () => {
            calc.previousInput = '12';
            calc.currentInput = '12';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('144');
        });

        test('7 * 10 = 70', () => {
            calc.previousInput = '7';
            calc.currentInput = '10';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('70');
        });

        test('7 * 100 = 700', () => {
            calc.previousInput = '7';
            calc.currentInput = '100';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('700');
        });

        test('7 * 1000 = 7000', () => {
            calc.previousInput = '7';
            calc.currentInput = '1000';
            calc.operator = '*';
            calc.calculate();
            expect(calc.currentInput).toBe('7000');
        });
    });
});