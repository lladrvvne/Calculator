function divide(a, b) {
    if (b === 0) {
        throw new Error('Деление на ноль');
    }
    return a / b;
}


function multiply(a, b) {
    return a * b;
}


function sqrt(a) {
    if (a < 0) {
        throw new Error('Квадратный корень из отрицательного числа');
    }
    return Math.sqrt(a);
}


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}

module.exports = {
    divide,
    multiply,
    sqrt,
    add,
    subtract
};