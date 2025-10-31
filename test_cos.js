console.log("=== UNITTEST ДЛЯ ФУНКЦИИ calculateCos() ===");

class TestCalculatorCos {
    constructor() {
        this.currentInput = '0';
        this.calculationHistory = [];
    }

    calculateCos() {
        const value = parseFloat(this.currentInput);
        if (!isNaN(value)) {
            const radians = value * Math.PI / 180;
            const result = Math.cos(radians);
            this.addToHistory(`cos(${value}°)`, result.toString());
            this.currentInput = result.toString();
            return result;
        }
        return null;
    }

    addToHistory(expression, result) {
        this.calculationHistory.unshift({expression, result});
    }
}

const testCalcCos = new TestCalculatorCos();

// ТЕСТЫ ДЛЯ COS
console.log("1. ОСНОВНЫЕ ТЕСТЫ");

// Основные углы
testCalcCos.currentInput = '0';
let resultCos = testCalcCos.calculateCos();
console.log(resultCos === 1 ? "PASS: cos(0°) = 1" : `FAIL: cos(0°): ${resultCos}`);

testCalcCos.currentInput = '60';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - 0.5) < 0.0001 ? "PASS: cos(60°) = 0.5" : `FAIL: cos(60°): ${resultCos}`);

testCalcCos.currentInput = '90';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - 0) < 0.0001 ? "PASS: cos(90°) ≈ 0" : `FAIL: cos(90°): ${resultCos}`);

testCalcCos.currentInput = '180';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - (-1)) < 0.0001 ? "PASS: cos(180°) = -1" : `FAIL: cos(180°): ${resultCos}`);

testCalcCos.currentInput = '270';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - 0) < 0.0001 ? "PASS: cos(270°) ≈ 0" : `FAIL: cos(270°): ${resultCos}`);

testCalcCos.currentInput = '360';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - 1) < 0.0001 ? "PASS: cos(360°) = 1" : `FAIL: cos(360°): ${resultCos}`);

console.log("\n2. ТЕСТЫ С ОТРИЦАТЕЛЬНЫМИ УГЛАМИ");

testCalcCos.currentInput = '-60';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - 0.5) < 0.0001 ? "PASS: cos(-60°) = 0.5" : `FAIL: cos(-60°): ${resultCos}`);

testCalcCos.currentInput = '-90';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - 0) < 0.0001 ? "PASS: cos(-90°) ≈ 0" : `FAIL: cos(-90°): ${resultCos}`);

testCalcCos.currentInput = '-180';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - (-1)) < 0.0001 ? "PASS: cos(-180°) = -1" : `FAIL: cos(-180°): ${resultCos}`);

console.log("\n3. ТЕСТЫ С ДРОБНЫМИ УГЛАМИ");

testCalcCos.currentInput = '45';
resultCos = testCalcCos.calculateCos();
let expectedCos = Math.sqrt(2)/2;
console.log(Math.abs(resultCos - expectedCos) < 0.0001 ? "PASS: cos(45°) ≈ 0.7071" : `FAIL: cos(45°): ${resultCos}`);

testCalcCos.currentInput = '15';
resultCos = testCalcCos.calculateCos();
expectedCos = 0.965926;
console.log(Math.abs(resultCos - expectedCos) < 0.0001 ? "PASS: cos(15°) ≈ 0.9659" : `FAIL: cos(15°): ${resultCos}`);

testCalcCos.currentInput = '75';
resultCos = testCalcCos.calculateCos();
expectedCos = 0.258819;
console.log(Math.abs(resultCos - expectedCos) < 0.0001 ? "PASS: cos(75°) ≈ 0.2588" : `FAIL: cos(75°): ${resultCos}`);

testCalcCos.currentInput = '120';
resultCos = testCalcCos.calculateCos();
expectedCos = -0.5;
console.log(Math.abs(resultCos - expectedCos) < 0.0001 ? "PASS: cos(120°) = -0.5" : `FAIL: cos(120°): ${resultCos}`);

testCalcCos.currentInput = '135';
resultCos = testCalcCos.calculateCos();
expectedCos = -Math.sqrt(2)/2;
console.log(Math.abs(resultCos - expectedCos) < 0.0001 ? "PASS: cos(135°) ≈ -0.7071" : `FAIL: cos(135°): ${resultCos}`);

console.log("\n4. ТЕСТЫ ГРАНИЧНЫХ СЛУЧАЕВ");

testCalcCos.currentInput = '720';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - 1) < 0.0001 ? "PASS: cos(720°) = 1" : `FAIL: cos(720°): ${resultCos}`);

testCalcCos.currentInput = '1080';
resultCos = testCalcCos.calculateCos();
console.log(Math.abs(resultCos - 1) < 0.0001 ? "PASS: cos(1080°) = 1" : `FAIL: cos(1080°): ${resultCos}`);

testCalcCos.currentInput = '22.5';
resultCos = testCalcCos.calculateCos();
expectedCos = Math.cos(22.5 * Math.PI / 180);
console.log(Math.abs(resultCos - expectedCos) < 0.0001 ? "PASS: cos(22.5°) вычисляется корректно" : `FAIL: cos(22.5°): ${resultCos}`);

console.log("\n5. ТЕСТЫ ОБРАБОТКИ ОШИБОК");

testCalcCos.currentInput = 'abc';
resultCos = testCalcCos.calculateCos();
console.log(resultCos === null ? "PASS: Некорректный ввод обрабатывается" : "FAIL: Некорректный ввод не обработан");

testCalcCos.currentInput = '';
resultCos = testCalcCos.calculateCos();
console.log(resultCos === null ? "PASS: Пустой ввод обрабатывается" : "FAIL: Пустой ввод не обработан");

testCalcCos.currentInput = 'undefined';
resultCos = testCalcCos.calculateCos();
console.log(resultCos === null ? "PASS: Ввод 'undefined' обрабатывается" : "FAIL: Ввод 'undefined' не обработан");

console.log("\n=== ТЕСТИРОВАНИЕ COS ЗАВЕРШЕНО ===");