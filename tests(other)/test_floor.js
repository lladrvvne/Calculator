
class TestFloor {
    constructor() {
        this.passedTests = 0;
        this.failedTests = 0;
        this.totalTests = 0;
        this.testResults = [];
    }

    runAllTests() {
        console.log('=== ТЕСТИРОВАНИЕ ФУНКЦИИ FLOOR ===\n');
        
        this.testFloorBasic();
        this.testFloorNegativeNumbers();
        this.testFloorFractions();
        this.testFloorEdgeCases();
        this.testFloorLargeNumbers();
        this.testFloorPrecision();
        this.testFloorSpecialCases();
        this.testFloorWithHistory();
        this.testFloorErrorHandling();
        
        this.printResults();
    }

    assertEquals(actual, expected, testName) {
        this.totalTests++;
        const actualNum = typeof actual === 'string' ? parseFloat(actual) : actual;
        const expectedNum = typeof expected === 'string' ? parseFloat(expected) : expected;
        
        if (actualNum === expectedNum) {
            console.log(`ПРОЙДЕН: ${testName}`);
            console.log(`Ожидалось: ${expected}, Получено: ${actual}`);
            this.passedTests++;
            this.testResults.push({ test: testName, status: 'PASS', expected, actual });
        } else {
            console.log(`ПРОВАЛЕН: ${testName}`);
            console.log(`Ожидалось: ${expected}, Получено: ${actual}`);
            this.failedTests++;
            this.testResults.push({ test: testName, status: 'FAIL', expected, actual });
        }
    }

    assertTrue(condition, testName) {
        this.totalTests++;
        if (condition) {
            console.log(`ПРОЙДЕН: ${testName}`);
            this.passedTests++;
            this.testResults.push({ test: testName, status: 'PASS' });
        } else {
            console.log(`ПРОВАЛЕН: ${testName}`);
            this.failedTests++;
            this.testResults.push({ test: testName, status: 'FAIL' });
        }
    }

    // Базовые тесты функции floor
    testFloorBasic() {
        console.log('--- Базовые тесты функции floor ---');
        
        const calc = new Calculator();
        
        // Тест 1: Положительное целое число
        calc.currentInput = '5';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '5', 'floor(5) = 5');
        
        // Тест 2: Другое положительное целое
        calc.currentInput = '10';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '10', 'floor(10) = 10');
        
        // Тест 3: Ноль
        calc.currentInput = '0';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '0', 'floor(0) = 0');
        
        // Тест 4: Положительная дробь < 0.5
        calc.currentInput = '3.2';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '3', 'floor(3.2) = 3');
        
        // Тест 5: Положительная дробь > 0.5
        calc.currentInput = '7.9';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '7', 'floor(7.9) = 7');
        
        // Тест 6: Положительная дробь = 0.5
        calc.currentInput = '4.5';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '4', 'floor(4.5) = 4');
    }

    // Тесты с отрицательными числами
    testFloorNegativeNumbers() {
        console.log('\n--- Тесты с отрицательными числами ---');
        
        const calc = new Calculator();
        
        // Тест 7: Отрицательное целое
        calc.currentInput = '-5';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-5', 'floor(-5) = -5');
        
        // Тест 8: Отрицательная дробь > -0.5
        calc.currentInput = '-3.2';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-4', 'floor(-3.2) = -4');
        
        // Тест 9: Отрицательная дробь < -0.5
        calc.currentInput = '-7.9';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-8', 'floor(-7.9) = -8');
        
        // Тест 10: Отрицательная дробь = -0.5
        calc.currentInput = '-4.5';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-5', 'floor(-4.5) = -5');
        
        // Тест 11: Очень маленькое отрицательное число
        calc.currentInput = '-0.1';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-1', 'floor(-0.1) = -1');
        
        // Тест 12: Отрицательное число близкое к целому
        calc.currentInput = '-2.0000001';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-3', 'floor(-2.0000001) = -3');
    }

    // Тесты с дробными числами
    testFloorFractions() {
        console.log('\n--- Тесты с дробными числами ---');
        
        const calc = new Calculator();
        
        // Тест 13: Маленькая положительная дробь
        calc.currentInput = '0.1';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '0', 'floor(0.1) = 0');
        
        // Тест 14: Дробь близкая к 1
        calc.currentInput = '0.999999';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '0', 'floor(0.999999) = 0');
        
        // Тест 15: Дробь с многими знаками
        calc.currentInput = '3.14159265359';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '3', 'floor(3.14159265359) = 3');
        
        // Тест 16: Дробь ровно 0.5
        calc.currentInput = '8.5';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '8', 'floor(8.5) = 8');
        
        // Тест 17: Дробь ровно 0.999...
        calc.currentInput = '9.999';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '9', 'floor(9.999) = 9');
    }

    // Граничные случаи
    testFloorEdgeCases() {
        console.log('\n--- Граничные случаи ---');
        
        const calc = new Calculator();
        
        // Тест 18: Число очень близкое к следующему целому
        calc.currentInput = '6.9999999999';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '6', 'floor(6.9999999999) = 6');
        
        // Тест 19: Число очень близкое к предыдущему целому
        calc.currentInput = '7.0000000001';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '7', 'floor(7.0000000001) = 7');
        
        // Тест 20: Очень маленькое положительное число
        calc.currentInput = '0.000000001';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '0', 'floor(0.000000001) = 0');
        
        // Тест 21: Очень маленькое отрицательное число
        calc.currentInput = '-0.000000001';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-1', 'floor(-0.000000001) = -1');
    }

    // Тесты с большими числами
    testFloorLargeNumbers() {
        console.log('\n--- Тесты с большими числами ---');
        
        const calc = new Calculator();
        
        // Тест 22: Большое положительное целое
        calc.currentInput = '123456789';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '123456789', 'floor(123456789) = 123456789');
        
        // Тест 23: Большое положительное дробное
        calc.currentInput = '123456789.987654321';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '123456789', 'floor(123456789.987654321) = 123456789');
        
        // Тест 24: Большое отрицательное целое
        calc.currentInput = '-987654321';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-987654321', 'floor(-987654321) = -987654321');
        
        // Тест 25: Большое отрицательное дробное
        calc.currentInput = '-987654321.123456789';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-987654322', 'floor(-987654321.123456789) = -987654322');
        
        // Тест 26: Очень большое число
        calc.currentInput = '999999999.999999999';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '999999999', 'floor(999999999.999999999) = 999999999');
    }

    // Тесты точности
    testFloorPrecision() {
        console.log('\n--- Тесты точности ---');
        
        const calc = new Calculator();
        
        // Тест 27: Число с 15 знаками после запятой
        calc.currentInput = '1.123456789012345';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '1', 'floor(1.123456789012345) = 1');
        
        // Тест 28: Число с максимальной точностью
        calc.currentInput = '2.999999999999999';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '2', 'floor(2.999999999999999) = 2');
        
        // Тест 29: Граничное значение для округления
        calc.currentInput = '5.000000000000001';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '5', 'floor(5.000000000000001) = 5');
        
        // Тест 30: Граничное отрицательное значение
        calc.currentInput = '-3.999999999999999';
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '-4', 'floor(-3.999999999999999) = -4');
    }

    // Специальные случаи
    testFloorSpecialCases() {
        console.log('\n--- Специальные случаи ---');
        
        const calc = new Calculator();
        
        // Тест 31: Число с экспоненциальной записью (если поддерживается)
        calc.currentInput = '1.23e+2'; // 123
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '123', 'floor(1.23e+2) = 123');
        
        // Тест 32: Число в научной нотации с дробной частью
        calc.currentInput = '1.234e+1'; // 12.34
        calc.calculateFloor();
        this.assertEquals(calc.currentInput, '12', 'floor(1.234e+1) = 12');
        
        // Тест 33: Проверка waitingForNewInput флага
        calc.currentInput = '15.7';
        calc.calculateFloor();
        this.assertTrue(calc.waitingForNewInput, 'Флаг waitingForNewInput установлен');
        
        // Тест 34: Повторное применение floor
        calc.currentInput = '8.3';
        calc.calculateFloor();
        calc.calculateFloor(); // Применяем второй раз к тому же результату
        this.assertEquals(calc.currentInput, '8', 'floor(floor(8.3)) = 8');
    }

    // Тесты с историей вычислений
    testFloorWithHistory() {
        console.log('\n--- Тесты с историей вычислений ---');
        
        const calc = new Calculator();
        
        // Тест 35: Проверка добавления в историю
        const initialHistoryLength = calc.calculationHistory.length;
        calc.currentInput = '10.6';
        calc.calculateFloor();
        this.assertTrue(calc.calculationHistory.length > initialHistoryLength, 
                       'Запись добавлена в историю после floor');
        
        // Тест 36: Проверка формата записи истории
        const lastEntry = calc.calculationHistory[0];
        this.assertTrue(lastEntry.expression.includes('floor') || lastEntry.result === '10', 
                       'Корректный формат записи в истории');
        
        // Тест 37: Множественные вычисления floor
        calc.currentInput = '25.9';
        calc.calculateFloor();
        calc.currentInput = '13.1';
        calc.calculateFloor();
        this.assertTrue(calc.calculationHistory.length >= 2, 
                       'Множественные записи floor в истории');
    }

    // Тесты обработки ошибок
    testFloorErrorHandling() {
        console.log('\n--- Тесты обработки ошибок ---');
        
        const calc = new Calculator();
        
        // Тест 38: Некорректный ввод (буквы)
        calc.currentInput = 'abc';
        calc.calculateFloor();
        // Ожидаем, что функция обработает NaN корректно
        this.assertTrue(isNaN(parseFloat(calc.currentInput)) || calc.currentInput === '0', 
                       'Обработка некорректного ввода');
        
        // Тест 39: Пустая строка
        calc.currentInput = '';
        calc.calculateFloor();
        this.assertTrue(calc.currentInput === '0' || isNaN(parseFloat(calc.currentInput)), 
                       'Обработка пустой строки');
        
        // Тест 40: Специальные символы
        calc.currentInput = '12.3$';
        calc.calculateFloor();
        this.assertTrue(isNaN(parseFloat(calc.currentInput)) || calc.currentInput === '0', 
                       'Обработка строки с специальными символами');
    }

    printResults() {
        console.log('\n=== РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ FLOOR ===');
        console.log(`Всего тестов: ${this.totalTests}`);
        console.log(`Пройдено: ${this.passedTests}`);
        console.log(`Провалено: ${this.failedTests}`);
        console.log(`Успешность: ${((this.passedTests / this.totalTests) * 100).toFixed(2)}%`);
        
        if (this.failedTests === 0) {
            console.log(' ВСЕ ТЕСТЫ FLOOR ПРОЙДЕНЫ УСПЕШНО!');
        } else {
            console.log(' ЕСТЬ ПРОВАЛЕННЫЕ ТЕСТЫ FLOOR!');
            console.log('\nДетали проваленных тестов:');
            this.testResults.filter(result => result.status === 'FAIL')
                          .forEach((result, index) => {
                              console.log(`${index + 1}. ${result.test}`);
                              console.log(`   Ожидалось: ${result.expected}, Получено: ${result.actual}`);
                          });
        }
        
        console.log('\n' + '='.repeat(50));
    }
}

// Запуск тестов при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const floorTester = new TestFloor();
        floorTester.runAllTests();
    }, 1000);
});
