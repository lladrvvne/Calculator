class TestSquareRoot {
    constructor() {
        this.passedTests = 0;
        this.failedTests = 0;
        this.totalTests = 0;
        this.testResults = [];
    }

    runAllTests() {
        console.log('=== ТЕСТИРОВАНИЕ ФУНКЦИИ КВАДРАТНОГО КОРНЯ ===\n');
        
        this.testSquareRootBasic();
        this.testSquareRootEdgeCases();
        this.testSquareRootFractions();
        this.testSquareRootLargeNumbers();
        this.testSquareRootPrecision();
        this.testSquareRootErrorCases();
        this.testSquareRootSpecialValues();
        this.testSquareRootWithHistory();
        
        this.printResults();
    }

    assertEquals(actual, expected, testName, tolerance = 0.000001) {
        this.totalTests++;
        const actualNum = typeof actual === 'string' ? parseFloat(actual) : actual;
        const expectedNum = typeof expected === 'string' ? parseFloat(expected) : expected;
        
        if (Math.abs(actualNum - expectedNum) < tolerance) {
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

    assertContains(actual, expectedSubstring, testName) {
        this.totalTests++;
        if (actual.includes(expectedSubstring)) {
            console.log(`✅ ПРОЙДЕН: ${testName}`);
            this.passedTests++;
            this.testResults.push({ test: testName, status: 'PASS' });
        } else {
            console.log(` ПРОВАЛЕН: ${testName}`);
            console.log(` Ожидалось содержание: "${expectedSubstring}", Получено: "${actual}"`);
            this.failedTests++;
            this.testResults.push({ test: testName, status: 'FAIL' });
        }
    }

    // Базовые тесты квадратного корня
    testSquareRootBasic() {
        console.log('--- Базовые тесты квадратного корня ---');
        
        const calc = new Calculator();
        
        // Тест 1: Корень из 4
        calc.currentInput = '4';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '2', '√4 = 2');
        
        // Тест 2: Корень из 9
        calc.currentInput = '9';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '3', '√9 = 3');
        
        // Тест 3: Корень из 16
        calc.currentInput = '16';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '4', '√16 = 4');
        
        // Тест 4: Корень из 25
        calc.currentInput = '25';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '5', '√25 = 5');
        
        // Тест 5: Корень из 1
        calc.currentInput = '1';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '1', '√1 = 1');
        
        // Тест 6: Корень из 0
        calc.currentInput = '0';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '0', '√0 = 0');
    }

    // Граничные случаи
    testSquareRootEdgeCases() {
        console.log('\n--- Граничные случаи квадратного корня ---');
        
        const calc = new Calculator();
        
        // Тест 7: Корень из 2
        calc.currentInput = '2';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, Math.sqrt(2).toString(), '√2 ≈ 1.41421356');
        
        // Тест 8: Корень из 0.25
        calc.currentInput = '0.25';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '0.5', '√0.25 = 0.5');
        
        // Тест 9: Корень из 0.01
        calc.currentInput = '0.01';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '0.1', '√0.01 = 0.1');
        
        // Тест 10: Корень из 0.0001
        calc.currentInput = '0.0001';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '0.01', '√0.0001 = 0.01');
        
        // Тест 11: Корень из очень маленького числа
        calc.currentInput = '0.00000001';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '0.0001', '√0.00000001 = 0.0001');
    }

    // Тесты с дробными числами
    testSquareRootFractions() {
        console.log('\n--- Тесты с дробными числами ---');
        
        const calc = new Calculator();
        
        // Тест 12: Корень из 2.25
        calc.currentInput = '2.25';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '1.5', '√2.25 = 1.5');
        
        // Тест 13: Корень из 0.64
        calc.currentInput = '0.64';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '0.8', '√0.64 = 0.8');
        
        // Тест 14: Корень из 1.44
        calc.currentInput = '1.44';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '1.2', '√1.44 = 1.2');
        
        // Тест 15: Корень из 6.25
        calc.currentInput = '6.25';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '2.5', '√6.25 = 2.5');
        
        // Тест 16: Корень из 0.81
        calc.currentInput = '0.81';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '0.9', '√0.81 = 0.9');
    }

    // Тесты с большими числами
    testSquareRootLargeNumbers() {
        console.log('\n--- Тесты с большими числами ---');
        
        const calc = new Calculator();
        
        // Тест 17: Корень из 100
        calc.currentInput = '100';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '10', '√100 = 10');
        
        // Тест 18: Корень из 10000
        calc.currentInput = '10000';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '100', '√10000 = 100');
        
        // Тест 19: Корень из 1000000
        calc.currentInput = '1000000';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '1000', '√1000000 = 1000');
        
        // Тест 20: Корень из 123456789
        calc.currentInput = '123456789';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, Math.sqrt(123456789).toString(), '√123456789 ≈ 11111.11106');
    }

    // Тесты точности вычислений
    testSquareRootPrecision() {
        console.log('\n--- Тесты точности вычислений ---');
        
        const calc = new Calculator();
        
        // Тест 21: Корень из 3 с высокой точностью
        calc.currentInput = '3';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, Math.sqrt(3).toString(), '√3 ≈ 1.73205080757', 0.0000001);
        
        // Тест 22: Корень из 5 с высокой точностью
        calc.currentInput = '5';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, Math.sqrt(5).toString(), '√5 ≈ 2.2360679775', 0.0000001);
        
        // Тест 23: Корень из 7 с высокой точностью
        calc.currentInput = '7';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, Math.sqrt(7).toString(), '√7 ≈ 2.64575131106', 0.0000001);
        
        // Тест 24: Корень из 10 с высокой точностью
        calc.currentInput = '10';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, Math.sqrt(10).toString(), '√10 ≈ 3.16227766017', 0.0000001);
    }

    // Тесты обработки ошибок
    testSquareRootErrorCases() {
        console.log('\n--- Тесты обработки ошибок ---');
        
        const calc = new Calculator();
        
        // Тест 25: Корень из отрицательного числа
        calc.currentInput = '-4';
        calc.calculateSquareRoot();
        this.assertContains(calc.currentInput, 'Ошибка', '√(-4) → Ошибка');
        
        // Тест 26: Корень из отрицательного дробного числа
        calc.currentInput = '-0.25';
        calc.calculateSquareRoot();
        this.assertContains(calc.currentInput, 'Ошибка', '√(-0.25) → Ошибка');
        
        // Тест 27: Корень из очень большого отрицательного числа
        calc.currentInput = '-999999999';
        calc.calculateSquareRoot();
        this.assertContains(calc.currentInput, 'Ошибка', '√(-999999999) → Ошибка');
        
        // Тест 28: Проверка флага ошибки
        calc.currentInput = '-1';
        calc.calculateSquareRoot();
        this.assertTrue(calc.currentInput.includes('Ошибка'), 'Флаг ошибки установлен');
    }

    // Тесты специальных значений
    testSquareRootSpecialValues() {
        console.log('\n--- Тесты специальных значений ---');
        
        const calc = new Calculator();
        
        // Тест 29: Корень из 0.5
        calc.currentInput = '0.5';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, Math.sqrt(0.5).toString(), '√0.5 ≈ 0.70710678118');
        
        // Тест 30: Корень из 0.000001
        calc.currentInput = '0.000001';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, '0.001', '√0.000001 = 0.001');
        
        // Тест 31: Корень из числа с многими знаками после запятой
        calc.currentInput = '123.456789';
        calc.calculateSquareRoot();
        this.assertEquals(calc.currentInput, Math.sqrt(123.456789).toString(), '√123.456789 ≈ 11.111111');
    }

    // Тесты с историей вычислений
    testSquareRootWithHistory() {
        console.log('\n--- Тесты с историей вычислений ---');
        
        const calc = new Calculator();
        const initialHistoryLength = calc.calculationHistory.length;
        
        // Тест 32: Проверка добавления в историю
        calc.currentInput = '16';
        calc.calculateSquareRoot();
        this.assertTrue(calc.calculationHistory.length > initialHistoryLength, 'Запись добавлена в историю');
        
        // Тест 33: Проверка формата записи истории
        const lastEntry = calc.calculationHistory[0];
        this.assertTrue(lastEntry.expression.includes('√') || lastEntry.result === '4', 
                       'Корректный формат записи в истории');
        
        // Тест 34: Проверка waitingForNewInput флага
        this.assertTrue(calc.waitingForNewInput, 'Флаг waitingForNewInput установлен после вычисления');
    }

    printResults() {
        console.log('\n=== РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ КВАДРАТНОГО КОРНЯ ===');
        console.log(`Всего тестов: ${this.totalTests}`);
        console.log(`Пройдено: ${this.passedTests}`);
        console.log(`Провалено: ${this.failedTests}`);
        console.log(`Успешность: ${((this.passedTests / this.totalTests) * 100).toFixed(2)}%`);
        
        if (this.failedTests === 0) {
            console.log('ВСЕ ТЕСТЫ КВАДРАТНОГО КОРНЯ ПРОЙДЕНЫ УСПЕШНО!');
        } else {
            console.log('ЕСТЬ ПРОВАЛЕННЫЕ ТЕСТЫ КВАДРАТНОГО КОРНЯ!');
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
        const sqrtTester = new TestSquareRoot();
        sqrtTester.runAllTests();
    }, 1000);
});
