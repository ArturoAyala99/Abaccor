
////////////////////////////
const calculator = {
    displayValue: '',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}


function inputDecimal(dot) {
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
        // Append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {

        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
        
    }

    calculator.waitingForSecondOperand = true;
    
    calculator.operator = nextOperator;
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

/*function validarDecimal(dot)
{
    
}*/

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        console.log("error");
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();

    
});

////////////////////////////////////////////////////////////

$('body').on("keydown", function numeros(e) {

    
    console.log(e);
    
    var arreglo = { 
    
        //SIN teclado numérico
    
        13: "=", 
        187: "+", 
        189: "-", 
        80: "*", //106 (el 80 es la letra p)
        68: "/", //111 (el 68 es la letra d)
        190: ".",
        32: "all-clear", //(botón de espacio)
        
        
        
        48: 0, 
        49: 1, 
        50: 2, 
        51: 3, 
        52: 4,
        53: 5, 
        54: 6,
        55: 7, 
        56: 8, 
        57: 9, 
    
        //CON teclado numérico
    
        107: "+",  
        109: "-", 
        110: ".",
        111: "/",
        106: "*",
    
        96: 0, 
        97: 1, 
        98: 2, 
        99: 3, 
        100: 4, 
        101: 5, 
        102: 6, 
        103: 7, 
        104: 8, 
        105: 9, 
    };

    var valor = arreglo[e.keyCode]; 
    
    if (valor != undefined ) //validar que no pase datos distintos a numeros y operadores
    {

        $(" button[value = '"+valor+"' ] ").trigger('click');
        console.log(valor);
        
    }

    
    

})