// script.js - базовая структура
class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.historyElement = document.getElementById('history'); // Добавляем ссылку на элемент истории (Агафонов А. В.)
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForNewInput = false;
        this.memory = 0;
        this.maxDisplayLength = 12;
        this.isError = false;
        this.calculationHistory = []; // Массив для хранения истории (Агафонов А. В.)
        
        this.updateDisplay();
        this.updateHistory(); // Инициализируем отображение истории (Агафонов А. В.)
    }

    addToHistory(expression, result) {
        const historyEntry = {
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.calculationHistory.unshift(historyEntry); // Добавляем в начало
        
        // Ограничиваем историю последними 10 записями
        if (this.calculationHistory.length > 10) {
            this.calculationHistory = this.calculationHistory.slice(0, 10);
        }
        
        this.updateHistory();
    }

    // Метод для обновления отображения истории
    updateHistory() {
        if (!this.historyElement) return;
        
        if (this.calculationHistory.length === 0) {
            this.historyElement.innerHTML = '<div class="history-item">История пуста</div>';
            return;
        }
        
        this.historyElement.innerHTML = this.calculationHistory
            .map(entry => 
                `<div class="history-item">
                    <strong>${entry.expression}</strong> = ${entry.result}
                    <span style="float: right; font-size: 0.7em;">${entry.timestamp}</span>
                </div>`
            )
            .join('');
    }

    // Метод для очистки истории
    clearHistory() {
        this.calculationHistory = [];
        this.updateHistory();
    }

    

    updateDisplay() {
        let displayValue = this.currentInput;
    
        if (this.isError) {
            this.display.style.color = '#e74c3c';
        } else {
            this.display.style.color = 'white';
        }
        
        // Ограничение длины для дисплея
        if (displayValue.length > this.maxDisplayLength) {
            if (displayValue.includes('.')) {
                displayValue = parseFloat(displayValue).toPrecision(this.maxDisplayLength - 2);
            } else {
                displayValue = displayValue.substring(0, this.maxDisplayLength);
            }
        }
        
        this.display.value = displayValue;
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
        if (this.isError) {
            this.clearDisplay();
            return;
        }

        let computation;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        try {
            let expression = '';
            
            switch (this.operator) {
                case '+':
                    computation = prev + current;
                    expression = `${prev} + ${current}`;
                    break;
                case '-':
                    computation = prev - current;
                    expression = `${prev} - ${current}`;
                    break;
                case '*':
                    computation = prev * current;
                    expression = `${prev} × ${current}`;
                    break;
                case '/':
                    if (current === 0) {
                        throw new Error('Деление на ноль');
                    }
                    computation = prev / current;
                    expression = `${prev} ÷ ${current}`;
                    break;
                case '^':
                    computation = Math.pow(prev, current);
                    expression = `${prev}^${current}`;
                    break;
                case '%':
                    if (current === 0) {
                        throw new Error('Деление на ноль');
                    }
                    computation = prev % current;
                    expression = `${prev} % ${current}`;
                    break;
                default:
                    return;
            }

            if (isNaN(computation) || !isFinite(computation)) {
                throw new Error('Математическая ошибка');
            }

            // Добавляем запись в историю
            this.addToHistory(expression, computation.toString());
            
            this.currentInput = computation.toString();
            this.operator = '';
            this.previousInput = '';
            this.waitingForNewInput = true;
            this.isError = false;
            
        } catch (error) {
            this.currentInput = error.message;
            this.isError = true;
        }
        
        this.updateDisplay();
    }

    clearDisplay() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = '';
    this.waitingForNewInput = false;
    this.isError = false;
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
    calculateSin() {
        const value = parseFloat(this.currentInput);
        if (!isNaN(value)) {
            const radians = value * Math.PI / 180;
            const result = Math.sin(radians);
            this.addToHistory(`sin(${value}°)`, result.toString());
            this.currentInput = result.toString();
            this.waitingForNewInput = true;
            this.updateDisplay();
        }
    }

    calculateCos() {
        const value = parseFloat(this.currentInput);
        if (!isNaN(value)) {
            const radians = value * Math.PI / 180;
            const result = Math.cos(radians);
            this.addToHistory(`cos(${value}°)`, result.toString());
            this.currentInput = result.toString();
            this.waitingForNewInput = true;
            this.updateDisplay();
        }
    }

    calculatePower() {
        if (this.previousInput !== '' && this.operator && !this.waitingForNewInput) {
            this.calculate();
        }
        this.operator = '^';
        this.previousInput = this.currentInput;
        this.waitingForNewInput = true;
    }

    calculateSquareRoot() {
        const value = parseFloat(this.currentInput);
        if (!isNaN(value) && value >= 0) {
            this.currentInput = Math.sqrt(value).toString();
            this.waitingForNewInput = true;
            this.updateDisplay();
        } else {
            this.currentInput = 'Ошибка';
            this.updateDisplay();
        }
    }

    calculateFloor() {
        const value = parseFloat(this.currentInput);
        if (!isNaN(value)) {
            this.currentInput = Math.floor(value).toString();
            this.waitingForNewInput = true;
            this.updateDisplay();
        }
    }

    calculateCeil() {
        const value = parseFloat(this.currentInput);
        if (!isNaN(value)) {
            this.currentInput = Math.ceil(value).toString();
            this.waitingForNewInput = true;
            this.updateDisplay();
        }
    }

    calculateModulo() {
        if (this.previousInput !== '' && this.operator && !this.waitingForNewInput) {
            this.calculate();
        }
        this.operator = '%';
        this.previousInput = this.currentInput;
        this.waitingForNewInput = true;
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

function calculateSin() {
    calculator.calculateSin();
}

function calculateCos() {
    calculator.calculateCos();
}

function calculatePower() {
    calculator.calculatePower();
}

function calculateSquareRoot() {
    calculator.calculateSquareRoot();
}

function calculateFloor() {
    calculator.calculateFloor();
}

function calculateCeil() {
    calculator.calculateCeil();
}

function calculateModulo() {
    calculator.calculateModulo();
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
    }
);

function clearHistory() {
    calculator.clearHistory();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}