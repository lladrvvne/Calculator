console.log("=== UNITTEST ДЛЯ ФУНКЦИИ calculateSin() ===");

class TestCalculatorSin {
    constructor() {
        this.currentInput = '0';
        this.calculationHistory = [];
    }

    calculateSin() {
        const value = parseFloat(this.currentInput);
        if (!isNaN(value)) {
            const radians = value * Math.PI / 180;
            const result = Math.sin(radians);
            this.addToHistory(`sin(${value}°)`, result.toString());
            this.currentInput = result.toString();
            return result;
        }
        return null;
    }

    addToHistory(expression, result) {
        this.calculationHistory.unshift({expression, result});
    }
}

const testCalcSin = new TestCalculatorSin();

// ТЕСТЫ ДЛЯ SIN
console.log("1. ОСНОВНЫЕ ТЕСТЫ");

// Основные углы
testCalcSin.currentInput = '0';
let resultSin = testCalcSin.calculateSin();
console.log(resultSin === 0 ? "PASS: sin(0°) = 0" : `FAIL: sin(0°): ${resultSin}`);

testCalcSin.currentInput = '30';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - 0.5) < 0.0001 ? "PASS: sin(30°) ≈ 0.5" : `FAIL: sin(30°): ${resultSin}`);

testCalcSin.currentInput = '90';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - 1) < 0.0001 ? "PASS: sin(90°) = 1" : `FAIL: sin(90°): ${resultSin}`);

testCalcSin.currentInput = '180';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - 0) < 0.0001 ? "PASS: sin(180°) ≈ 0" : `FAIL: sin(180°): ${resultSin}`);

testCalcSin.currentInput = '270';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - (-1)) < 0.0001 ? "PASS: sin(270°) = -1" : `FAIL: sin(270°): ${resultSin}`);

testCalcSin.currentInput = '360';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - 0) < 0.0001 ? "PASS: sin(360°) ≈ 0" : `FAIL: sin(360°): ${resultSin}`);

console.log("\n2. ТЕСТЫ С ОТРИЦАТЕЛЬНЫМИ УГЛАМИ");

testCalcSin.currentInput = '-30';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - (-0.5)) < 0.0001 ? "PASS: sin(-30°) = -0.5" : `FAIL: sin(-30°): ${resultSin}`);

testCalcSin.currentInput = '-90';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - (-1)) < 0.0001 ? "PASS: sin(-90°) = -1" : `FAIL: sin(-90°): ${resultSin}`);

testCalcSin.currentInput = '-180';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - 0) < 0.0001 ? "PASS: sin(-180°) ≈ 0" : `FAIL: sin(-180°): ${resultSin}`);

console.log("\n3. ТЕСТЫ С ДРОБНЫМИ УГЛАМИ");

testCalcSin.currentInput = '45';
resultSin = testCalcSin.calculateSin();
let expectedSin = Math.sqrt(2)/2;
console.log(Math.abs(resultSin - expectedSin) < 0.0001 ? "PASS: sin(45°) ≈ 0.7071" : `FAIL: sin(45°): ${resultSin}`);

testCalcSin.currentInput = '15';
resultSin = testCalcSin.calculateSin();
expectedSin = 0.258819;
console.log(Math.abs(resultSin - expectedSin) < 0.0001 ? "PASS: sin(15°) ≈ 0.2588" : `FAIL: sin(15°): ${resultSin}`);

testCalcSin.currentInput = '75';
resultSin = testCalcSin.calculateSin();
expectedSin = 0.965926;
console.log(Math.abs(resultSin - expectedSin) < 0.0001 ? "PASS: sin(75°) ≈ 0.9659" : `FAIL: sin(75°): ${resultSin}`);

testCalcSin.currentInput = '22.5';
resultSin = testCalcSin.calculateSin();
expectedSin = 0.382683;
console.log(Math.abs(resultSin - expectedSin) < 0.0001 ? "PASS: sin(22.5°) ≈ 0.3827" : `FAIL: sin(22.5°): ${resultSin}`);

console.log("\n4. ТЕСТЫ ГРАНИЧНЫХ СЛУЧАЕВ");

testCalcSin.currentInput = '720';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - 0) < 0.0001 ? "PASS: sin(720°) ≈ 0" : `FAIL: sin(720°): ${resultSin}`);

testCalcSin.currentInput = '1080';
resultSin = testCalcSin.calculateSin();
console.log(Math.abs(resultSin - 0) < 0.0001 ? "PASS: sin(1080°) ≈ 0" : `FAIL: sin(1080°): ${resultSin}`);

testCalcSin.currentInput = '30.5';
resultSin = testCalcSin.calculateSin();
expectedSin = Math.sin(30.5 * Math.PI / 180);
console.log(Math.abs(resultSin - expectedSin) < 0.0001 ? "PASS: sin(30.5°) вычисляется корректно" : `FAIL: sin(30.5°): ${resultSin}`);

console.log("\n5. ТЕСТЫ ОБРАБОТКИ ОШИБОК");

testCalcSin.currentInput = 'abc';
resultSin = testCalcSin.calculateSin();
console.log(resultSin === null ? "PASS: Некорректный ввод обрабатывается" : "FAIL: Некорректный ввод не обработан");

testCalcSin.currentInput = '';
resultSin = testCalcSin.calculateSin();
console.log(resultSin === null ? "PASS: Пустой ввод обрабатывается" : "FAIL: Пустой ввод не обработан");

testCalcSin.currentInput = 'NaN';
resultSin = testCalcSin.calculateSin();
console.log(resultSin === null ? "PASS: Ввод 'NaN' обрабатывается" : "FAIL: Ввод 'NaN' не обработан");

console.log("\n=== ТЕСТИРОВАНИЕ SIN ЗАВЕРШЕНО ===");