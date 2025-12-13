// tests/operations-all.test.js - Чистые функции: add, subtract, sqrt
const { add, subtract, sqrt } = require('../src/operations');

describe('ТЕСТИРОВАНИЕ ЧИСТЫХ ФУНКЦИЙ (СЛОЖЕНИЕ, ВЫЧИТАНИЕ, КОРЕНЬ)', () => {
    describe('1. ФУНКЦИЯ СЛОЖЕНИЯ (add)', () => {
        test('add(2, 3) = 5', () => {
            expect(add(2, 3)).toBe(5);
        });

        test('add(0, 5) = 5', () => {
            expect(add(0, 5)).toBe(5);
        });

        test('add(-2, 3) = 1', () => {
            expect(add(-2, 3)).toBe(1);
        });

        test('add(2.5, 3.5) = 6', () => {
            expect(add(2.5, 3.5)).toBe(6);
        });

        test('add(100, 200) = 300', () => {
            expect(add(100, 200)).toBe(300);
        });

        test('add(999, 1) = 1000', () => {
            expect(add(999, 1)).toBe(1000);
        });

        test('add(0.1, 0.2) ≈ 0.3', () => {
            expect(add(0.1, 0.2)).toBeCloseTo(0.3, 10);
        });
    });

    describe('2. ФУНКЦИЯ ВЫЧИТАНИЯ (subtract)', () => {
        test('subtract(10, 3) = 7', () => {
            expect(subtract(10, 3)).toBe(7);
        });

        test('subtract(5, 5) = 0', () => {
            expect(subtract(5, 5)).toBe(0);
        });

        test('subtract(0, 5) = -5', () => {
            expect(subtract(0, 5)).toBe(-5);
        });

        test('subtract(-3, 2) = -5', () => {
            expect(subtract(-3, 2)).toBe(-5);
        });

        test('subtract(3, -2) = 5', () => {
            expect(subtract(3, -2)).toBe(5);
        });

        test('subtract(2.5, 1.5) = 1', () => {
            expect(subtract(2.5, 1.5)).toBe(1);
        });

        test('subtract(1000, 999) = 1', () => {
            expect(subtract(1000, 999)).toBe(1);
        });
    });

    describe('3. ФУНКЦИЯ КВАДРАТНОГО КОРНЯ (sqrt)', () => {
        test('sqrt(0) = 0', () => {
            expect(sqrt(0)).toBe(0);
        });

        test('sqrt(1) = 1', () => {
            expect(sqrt(1)).toBe(1);
        });

        test('sqrt(4) = 2', () => {
            expect(sqrt(4)).toBe(2);
        });

        test('sqrt(9) = 3', () => {
            expect(sqrt(9)).toBe(3);
        });

        test('sqrt(25) = 5', () => {
            expect(sqrt(25)).toBe(5);
        });

        test('sqrt(100) = 10', () => {
            expect(sqrt(100)).toBe(10);
        });

        test('sqrt(0.25) = 0.5', () => {
            expect(sqrt(0.25)).toBe(0.5);
        });

        test('sqrt(2) ≈ 1.41421', () => {
            expect(sqrt(2)).toBeCloseTo(1.41421, 5);
        });

        test('sqrt(3) ≈ 1.73205', () => {
            expect(sqrt(3)).toBeCloseTo(1.73205, 5);
        });

        test('sqrt(негативное) → ошибка', () => {
            expect(() => sqrt(-1)).toThrow('Квадратный корень из отрицательного числа');
            expect(() => sqrt(-4)).toThrow('Квадратный корень из отрицательного числа');
        });
    });
});
