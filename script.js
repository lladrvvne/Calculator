// script.js - базовая структура
class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForNewInput = false;
        this.memory = 0;
        
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.currentInput;
    }

    appendNumber(number) {
        if (this.waitingForNewInput) {
            this.currentInput = number;
            this.waitingForNewInput = false;
        } else {
            this.currentInput = this.currentInput === '0' ? number : this.currentInput + number;
        }
        this.updateDisplay();
    }

    appendDecimal() {
        if (this.waitingForNewInput) {
            this.currentInput = '0.';
            this.waitingForNewInput = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }

    appendOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput !== '' && this.operator && !this.waitingForNewInput) {
            this.calculate();
        }

        this.operator = nextOperator;
        this.previousInput = this.currentInput;
        this.waitingForNewInput = true;
    }

    calculate() {
    let computation;
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                computation = 'Ошибка: деление на 0';
            } else {
                computation = prev / current;
            }
            break;
        default:
            return;
    }

    this.currentInput = computation.toString();
    this.operator = '';
    this.previousInput = '';
    this.waitingForNewInput = true;
    this.updateDisplay();
    }

    clearDisplay() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForNewInput = false;
        this.updateDisplay();
    }

    clearEntry() {
        this.currentInput = '0';
        this.updateDisplay();
    }

    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }
}

// Создаем экземпляр калькулятора
const calculator = new Calculator();

// Глобальные функции для обработки событий onclick
function appendNumber(number) {
    calculator.appendNumber(number);
}

function appendDecimal() {
    calculator.appendDecimal();
}

function appendOperator(operator) {
    calculator.appendOperator(operator);
}

function calculate() {
    calculator.calculate();
}

function clearDisplay() {
    calculator.clearDisplay();
}

function clearEntry() {
    calculator.clearEntry();
}

function backspace() {
    calculator.backspace();
}

// Заглушки для остальных функций
function calculateSin() {
    alert('Функция sin будет реализована позже');
}

function calculateCos() {
    alert('Функция cos будет реализована позже');
}

function calculatePower() {
    alert('Функция возведения в степень будет реализована позже');
}

function calculateSquareRoot() {
    alert('Функция квадратного корня будет реализована позже');
}

function calculateFloor() {
    alert('Функция floor будет реализована позже');
}

function calculateCeil() {
    alert('Функция ceil будет реализована позже');
}

function calculateModulo() {
    alert('Функция остатка от деления будет реализована позже');
}

function memoryClear() {
    calculator.memory = 0;
    alert('Память очищена');
}

function memoryRecall() {
    calculator.currentInput = calculator.memory.toString();
    calculator.updateDisplay();
}

function memoryAdd() {
    const currentValue = parseFloat(calculator.currentInput);
    if (!isNaN(currentValue)) {
        calculator.memory += currentValue;
    }
}

function memorySubtract() {
    const currentValue = parseFloat(calculator.currentInput);
    if (!isNaN(currentValue)) {
        calculator.memory -= currentValue;
    }
}
    document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
            if (event.key >= '0' && event.key <= '9') {
                calculator.appendNumber(event.key);
            } else if (event.key === '.') {
                calculator.appendDecimal();
            } else if (event.key === '+') {
                calculator.appendOperator('+');
            } else if (event.key === '-') {
                calculator.appendOperator('-');
            } else if (event.key === '*') {
                calculator.appendOperator('*');
            } else if (event.key === '/') {
                event.preventDefault();
                calculator.appendOperator('/');
            } else if (event.key === 'Enter' || event.key === '=') {
                calculator.calculate();
            } else if (event.key === 'Escape') {
                calculator.clearDisplay();
            } else if (event.key === 'Backspace') {
                calculator.backspace();
            }
        }); 
    });