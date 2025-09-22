// Variables para almacenar el estado de la calculadora
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let resetScreen = false;

// Referencias a los elementos del DOM
const currentOperandElement = document.querySelector('.current-operand');
const previousOperandElement = document.querySelector('.previous-operand');
        const keys = document.querySelectorAll('.key');

// Funciones flecha para las operaciones de la calculadora
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : 'Error';
const percentage = (a, b) => (a * b) / 100;

// Realizar el cálculo basado en la operación seleccionada
const calculate = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
            
    if (isNaN(prev) || isNaN(current)) return;
            
    switch (operation) {
        case '+':
            computation = add(prev, current);
            break;
        case '-':
            computation = subtract(prev, current);
            break;
        case '×':
            computation = multiply(prev, current);
            break;
        case '÷':
            computation = divide(prev, current);
            break;
        case '%':
            computation = percentage(prev, current);
            break;
        default:
            return;
            }
        
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
};

 // Agregar un número al operando actual
const appendNumber = (number) => {
    if (resetScreen) {
        currentOperand = '';
        resetScreen = false;
    }
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
};

        // Elegir una operación
const chooseOperation = (op) => {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
};

// Limpiar la calculadora
const clear = () => {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
};

// Eliminar el último dígito
const deleteNumber = () => {
     if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
};

// Formatear el número para mostrarlo en pantalla
const getDisplayNumber = (number) => {
    if (number === 'Error') return 'Error';
            
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
            
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('es', {
            maximumFractionDigits: 0
        });
    }
            
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
     }
};

// Actualizar la pantalla de la calculadora
const updateDisplay = () => {
    currentOperandElement.textContent = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousOperandElement.textContent = 
            `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
};

// Agregar event listeners a todos los botones
keys.forEach(key => {
    key.addEventListener('click', () => {
         // Números
        if (key.classList.contains('number')) {
             appendNumber(key.textContent);
            updateDisplay();
        }
        // Operadores
        else if (key.classList.contains('operator')) {
            chooseOperation(key.textContent);
            updateDisplay();
        }
        // Igual
        else if (key.classList.contains('equals')) {
            calculate();
            updateDisplay();
        }
        // Clear
        else if (key.classList.contains('clear')) {
            clear();
            updateDisplay();
        }
        // Delete
        else if (key.classList.contains('delete')) {
            deleteNumber();
            updateDisplay();
        }
        // Decimal
        else if (key.classList.contains('decimal')) {
            appendNumber(key.textContent);
            updateDisplay();
        }
    });
});

// Inicializar la pantalla
updateDisplay();