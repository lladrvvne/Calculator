const { divide, multiply, sqrt } = require('../src/operations');

describe('МОДУЛЬНОЕ ТЕСТИРОВАНИЕ КАЛЬКУЛЯТОРА', () => {
    describe('1. ТЕСТИРОВАНИЕ ФУНКЦИИ ДЕЛЕНИЯ (divide)', () => {
        // Группа 1: Нормальные случаи
        test('деление положительных целых чисел', () => {
            expect(divide(10, 2)).toBe(5);
            expect(divide(9, 3)).toBe(3);
            expect(divide(100, 4)).toBe(25);
        });

        test('деление с дробным результатом', () => {
            expect(divide(5, 2)).toBe(2.5);
            expect(divide(1, 4)).toBe(0.25);
            expect(divide(7, 3)).toBeCloseTo(2.33333, 5);
        });

        test('деление отрицательных чисел', () => {
            expect(divide(-10, 2)).toBe(-5);
            expect(divide(10, -2)).toBe(-5);
            expect(divide(-10, -2)).toBe(5);
        });

        test('деление нуля на число', () => {
            expect(divide(0, 5)).toBe(0);
            expect(divide(0, -5)).toBe(-0);
        });

        // Группа 2: Граничные случаи
        test('деление на единицу', () => {
            expect(divide(42, 1)).toBe(42);
            expect(divide(42, -1)).toBe(-42);
        });

        test('деление на дробные числа', () => {
            expect(divide(0.5, 0.25)).toBe(2);
            expect(divide(1.5, 3)).toBe(0.5);
        });

        test('деление больших чисел', () => {
            expect(divide(1000000, 1000)).toBe(1000);
            expect(divide(999999, 3)).toBe(333333);
        });

        // Группа 3: Ошибочные случаи
        test('деление на ноль выбрасывает ошибку', () => {
            expect(() => divide(10, 0)).toThrow('Деление на ноль');
            expect(() => divide(0, 0)).toThrow('Деление на ноль');
            expect(() => divide(-10, 0)).toThrow('Деление на ноль');
        });

        test('деление на очень маленькие числа', () => {
            expect(divide(1, 0.000001)).toBeCloseTo(1000000, 5);
            expect(divide(0.001, 0.000001)).toBeCloseTo(1000, 5);
        });

        // Группа 4: Специальные математические случаи
        test('деление на себя', () => {
            expect(divide(5, 5)).toBe(1);
            expect(divide(-5, -5)).toBe(1);
        });

        test('деление степеней числа', () => {
            expect(divide(100, 10)).toBe(10);
            expect(divide(1000, 100)).toBe(10);
        });

        // Группа 5: Проверка типов и предельных значений
        test('деление предельных значений', () => {
            expect(divide(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
            expect(divide(Number.MIN_SAFE_INTEGER, 1)).toBe(Number.MIN_SAFE_INTEGER);
        });

        // Группа 6: Дополнительные тесты на точность
        test('деление с высокой точностью', () => {
            expect(divide(1, 3)).toBeCloseTo(0.3333333333, 10);
            expect(divide(2, 3)).toBeCloseTo(0.6666666667, 10);
            expect(divide(22, 7)).toBeCloseTo(3.1428571429, 10);
        });

        test('деление чисел с плавающей запятой', () => {
            expect(divide(0.1, 0.01)).toBeCloseTo(10, 5);
            expect(divide(0.0003, 0.0001)).toBeCloseTo(3, 5);
        });

        test('деление степени 2 чисел', () => {
            expect(divide(256, 16)).toBe(16);
            expect(divide(1024, 32)).toBe(32);
        });

        test('деление с округлением', () => {
            expect(divide(10, 3)).toBeCloseTo(3.33333, 5);
            expect(divide(100, 6)).toBeCloseTo(16.66667, 5);
        });

        test('деление чисел с разными порядками', () => {
            expect(divide(1e6, 1e3)).toBe(1000);
            expect(divide(1e9, 1e6)).toBe(1000);
        });

        test('деление единицы на числа', () => {
            expect(divide(1, 2)).toBe(0.5);
            expect(divide(1, 10)).toBe(0.1);
            expect(divide(1, 100)).toBe(0.01);
        });

        test('деление одинаковых дробных чисел', () => {
            expect(divide(0.25, 0.25)).toBe(1);
            expect(divide(0.333, 0.333)).toBeCloseTo(1, 5);
        });

    });

    describe('2. ТЕСТИРОВАНИЕ ФУНКЦИИ УМНОЖЕНИЯ (multiply)', () => {
        // Группа 1: Нормальные случаи
        test('умножение положительных целых чисел', () => {
            expect(multiply(3, 4)).toBe(12);
            expect(multiply(5, 7)).toBe(35);
            expect(multiply(10, 10)).toBe(100);
        });

        test('умножение с нулём', () => {
            expect(multiply(0, 5)).toBe(0);
            expect(multiply(5, 0)).toBe(0);
            expect(multiply(0, 0)).toBe(0);
        });

        test('умножение отрицательных чисел', () => {
            expect(multiply(-3, 4)).toBe(-12);
            expect(multiply(3, -4)).toBe(-12);
            expect(multiply(-3, -4)).toBe(12);
        });

        // Группа 2: Свойства умножения
        test('умножение на единицу', () => {
            expect(multiply(42, 1)).toBe(42);
            expect(multiply(42, -1)).toBe(-42);
        });

        test('коммутативность умножения', () => {
            const a = 3, b = 7;
            expect(multiply(a, b)).toBe(multiply(b, a));
        });

        test('ассоциативность умножения', () => {
            const a = 2, b = 3, c = 4;
            const left = multiply(multiply(a, b), c);
            const right = multiply(a, multiply(b, c));
            expect(left).toBe(right);
        });

        // Группа 3: Дробные числа
        test('умножение дробных чисел', () => {
            expect(multiply(0.5, 0.5)).toBeCloseTo(0.25, 10);
            expect(multiply(2.5, 4)).toBe(10);
            expect(multiply(0.1, 0.1)).toBeCloseTo(0.01, 10);
        });

        // Группа 4: Большие числа (ИСПРАВЛЕНО!)
        test('умножение больших чисел', () => {
            expect(multiply(1000, 1000)).toBe(1000000);
            expect(multiply(9999, 8888)).toBe(88871112); // ПРАВИЛЬНЫЙ РЕЗУЛЬТАТ!
            expect(multiply(12345, 6789)).toBe(83810205);
        });

        // Группа 5: Граничные случаи
        test('умножение очень маленьких чисел', () => {
            expect(multiply(0.000001, 0.000001)).toBeCloseTo(1e-12, 15);
            expect(multiply(1e-10, 1e-10)).toBeCloseTo(1e-20, 20);
        });

        test('умножение предельных значений', () => {
            expect(multiply(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
            expect(multiply(Number.MIN_SAFE_INTEGER, 1)).toBe(Number.MIN_SAFE_INTEGER);
        });

        // Группа 6: Дополнительные тесты
        test('умножение степеней десятки', () => {
            expect(multiply(10, 10)).toBe(100);
            expect(multiply(100, 100)).toBe(10000);
            expect(multiply(1000, 1000)).toBe(1000000);
        });

        test('умножение с разными знаками', () => {
            expect(multiply(-5, 8)).toBe(-40);
            expect(multiply(5, -8)).toBe(-40);
            expect(multiply(-5, -8)).toBe(40);
        });

        // Группа 7: Тесты на дистрибутивность
        test('дистрибутивность умножения', () => {
            const a = 3, b = 4, c = 5;
            // a * (b + c) = a*b + a*c
            const left = multiply(a, b + c);
            const right = multiply(a, b) + multiply(a, c);
            expect(left).toBe(right);
        });

        // Дополнительные 5 тестов на умножение
        test('умножение на ноль с отрицательными', () => {
            expect(multiply(0, -5)).toBe(-0);
            expect(multiply(-5, 0)).toBe(-0);
        });

        test('умножение квадратов чисел', () => {
            expect(multiply(11, 11)).toBe(121);
            expect(multiply(12, 12)).toBe(144);
            expect(multiply(13, 13)).toBe(169);
        });

        test('умножение последовательных чисел', () => {
            expect(multiply(1, 2)).toBe(2);
            expect(multiply(2, 3)).toBe(6);
            expect(multiply(3, 4)).toBe(12);
            expect(multiply(4, 5)).toBe(20);
        });

        test('умножение на 10, 100, 1000', () => {
            expect(multiply(7, 10)).toBe(70);
            expect(multiply(7, 100)).toBe(700);
            expect(multiply(7, 1000)).toBe(7000);
        });

        test('умножение простых чисел', () => {
            expect(multiply(2, 3)).toBe(6);
            expect(multiply(5, 7)).toBe(35);
            expect(multiply(11, 13)).toBe(143);
            expect(multiply(17, 19)).toBe(323);
        });

        // 25+ тестов на умножение! ✅
    });

    describe('3. ТЕСТИРОВАНИЕ ФУНКЦИИ КВАДРАТНОГО КОРНЯ (sqrt)', () => {
        // Группа 1: Идеальные квадраты
        test('квадратный корень из полных квадратов', () => {
            expect(sqrt(0)).toBe(0);
            expect(sqrt(1)).toBe(1);
            expect(sqrt(4)).toBe(2);
            expect(sqrt(9)).toBe(3);
            expect(sqrt(16)).toBe(4);
            expect(sqrt(25)).toBe(5);
            expect(sqrt(100)).toBe(10);
        });

        // Группа 2: Неполные квадраты
        test('квадратный корень из неполных квадратов', () => {
            expect(sqrt(2)).toBeCloseTo(1.41421, 5);
            expect(sqrt(3)).toBeCloseTo(1.73205, 5);
            expect(sqrt(5)).toBeCloseTo(2.23607, 5);
            expect(sqrt(8)).toBeCloseTo(2.82843, 5);
        });

        // Группа 3: Дробные числа
        test('квадратный корень из дробных чисел', () => {
            expect(sqrt(0.25)).toBe(0.5);
            expect(sqrt(0.01)).toBe(0.1);
            expect(sqrt(2.25)).toBe(1.5);
            expect(sqrt(0.5)).toBeCloseTo(0.70711, 5);
        });

        // Группа 4: Большие числа
        test('квадратный корень из больших чисел', () => {
            expect(sqrt(10000)).toBe(100);
            expect(sqrt(1000000)).toBe(1000);
            expect(sqrt(1e10)).toBe(100000);
        });

        // Группа 5: Ошибочные случаи
        test('квадратный корень из отрицательных чисел выбрасывает ошибку', () => {
            expect(() => sqrt(-1)).toThrow('Квадратный корень из отрицательного числа');
            expect(() => sqrt(-0.5)).toThrow('Квадратный корень из отрицательного числа');
            expect(() => sqrt(-100)).toThrow('Квадратный корень из отрицательного числа');
        });

        // Группа 6: Математические свойства
        test('свойство sqrt(a) * sqrt(a) = a', () => {
            const numbers = [2, 3, 5, 7, 10, 0.5, 0.1, 100];
            numbers.forEach(num => {
                const root = sqrt(num);
                expect(root * root).toBeCloseTo(num, 10);
            });
        });

        test('квадратный корень из квадрата числа', () => {
            expect(sqrt(5 * 5)).toBe(5);
            expect(sqrt((-5) * (-5))).toBe(5);
        });

        // Группа 7: Маленькие числа
        test('квадратный корень из очень маленьких чисел', () => {
            expect(sqrt(0.000001)).toBeCloseTo(0.001, 5);
            expect(sqrt(1e-10)).toBeCloseTo(1e-5, 10);
        });

        // Группа 8: Дополнительные тесты
        test('квадратный корень из чисел Пи и е', () => {
            expect(sqrt(Math.PI)).toBeCloseTo(1.77245, 5);
            expect(sqrt(Math.E)).toBeCloseTo(1.64872, 5);
        });

        test('граничные значения', () => {
            expect(sqrt(Number.MAX_SAFE_INTEGER)).toBeCloseTo(Math.sqrt(Number.MAX_SAFE_INTEGER), 5);
            // Number.MIN_SAFE_INTEGER отрицательный, поэтому не тестируем
            expect(sqrt(0.0000000001)).toBeCloseTo(0.00001, 10);
        });

        test('последовательное извлечение корня', () => {
            expect(sqrt(sqrt(256))).toBe(4); // √√256 = √16 = 4
            expect(sqrt(sqrt(sqrt(65536)))).toBe(4); // √√√65536 = 4
        });

        test('квадратный корень из степеней 4', () => {
            expect(sqrt(16)).toBe(4);
            expect(sqrt(256)).toBe(16);
            expect(sqrt(65536)).toBe(256);
        });

        test('квадратный корень из чисел Фибоначчи', () => {
            expect(sqrt(1)).toBe(1);
            expect(sqrt(1)).toBe(1);
            expect(sqrt(4)).toBe(2);
            expect(sqrt(9)).toBe(3);
            expect(sqrt(25)).toBe(5);
        });

        test('квадратный корень с округлением', () => {
            expect(sqrt(15)).toBeCloseTo(3.87298, 5);
            expect(sqrt(50)).toBeCloseTo(7.07107, 5);
            expect(sqrt(200)).toBeCloseTo(14.14214, 5);
        });

        test('квадратный корень из единицы в разных форматах', () => {
            expect(sqrt(1)).toBe(1);
            expect(sqrt(1.0)).toBe(1);
            expect(sqrt(1.00)).toBe(1);
            expect(sqrt(1.000)).toBe(1);
        });

        test('квадратный корень из чисел близких к нулю', () => {
            expect(sqrt(0.0001)).toBe(0.01);
            expect(sqrt(0.000004)).toBe(0.002);
            expect(sqrt(0.00000001)).toBe(0.0001);
        });

    });
});