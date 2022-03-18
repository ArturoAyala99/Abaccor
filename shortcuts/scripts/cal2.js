/* var num1= "";
var num2= "";
var validar = false;
var operator;
var display = document.getElementById("pantalla");

function number(num)
{
    if (validar)
    {
        if (num == "+" || num == "-" || num == "*" || num == "/")
        {
            operator = num;//almacenar el operador
        }
        else
        {
            //display.value = "0";
            num2 = num2 + num;
            display.value= num2;
            console.log("num2 = " + num2);
        }
           
    }
    else
    {
        num1 = num1 + num;
        display.value= num1;
        console.log("num1 = " + num1);
    }

}

function operations(num1,num2, operator)
{
    var result;

    num1 = parseFloat(num1); 
    num2 = parseFloat(num2);

    switch(operator)
    {
        case "+":
            result = num1 + num2;
            display.value = result;
            validar = false;
            break;

        case "-":
            result = num1 - num2;
            display.value = result;
            validar = false;
            break;

        case "*":
            result = num1 * num2;
            display.value = result;
            validar = false;
        break;

        case "/":
            result = num1 / num2;
            display.value = result;
            validar = false;
            break;
    }

}

$('button').on('click', function (e){

    const { target } = e;

    if ( target.classList.contains('number'))
    {
        number(target.value); //agregar el primer número
    }

    if (target.classList.contains('operator'))
    {
        if (num1 == "0") //validar si quiere un operador al principio
        {
            number(target.value);
        }else{
            validar = true;
            number(target.value);//agregar el segundo número
        }
        
        
    }

    if (target.classList.contains('equal-sign'))
    {
        operations(num1, num2, operator);
    }
    
}) */

const operation = {
    leftValue: '',
    operator: '',
    rightValue: ''
}

var result;

var display = document.getElementById("pantalla");


function numberValue(num)
{
    
    operation.leftValue = operation.leftValue + num;

    display.value = operation.leftValue;
    console.log("left value:" + operation.leftValue);
}

function numberValue2(num)
{
    operation.rightValue = operation.rightValue + num;

    display.value = operation.rightValue;
    console.log("right value:" + operation.rightValue);

    
}

function resultOperations(num1, num2, op)
{
    num1 = parseFloat(operation.leftValue);
    num2 = parseFloat(operation.rightValue);
    switch(op)
    {
        case '+':
            result = num1 + num2;
            display.value = result;
            
            break;
        
        case '-':
            result = num1 - num2;
            display.value = result;
                
            break;
    }
}

$('button').on('click', function (e){

    const { target } = e;


    if (target.classList.contains('operator') )
    {
        
        if (operation.leftValue === '') //checar si presioné un operador antes de un número la primera vez
        {
            operation.leftValue = '0';
            operation.operator = target.value; //almacenar el operador

            console.log("left:"+operation.leftValue+"op:"+ operation.operator);

        }else{
            operation.operator = target.value; //almacenar el operador si ya tengo un valor en left value
        }
    }

    if (target.classList.contains('number'))
    {
        if (operation.leftValue === '0' || operation.operator != '') //validar que ya hay un operador o que ya haya un valor en left value para poner el segundo numero
        {
            numberValue2(target.value); //almacenar el segundo numero
            resultOperations(operation.leftValue, operation.rightValue, operation.operator) //si elegí un operador antes que un número
        }
        else{
            numberValue(target.value);
        }
    }

    if (target.classList.contains('decimal'))
    {
        // If the `displayValue` does not contain a decimal point
        if (!display.value.includes(target.value)) {
            // Append the decimal point
            display.value += target.value;

            if (operation.operator === '') //validar si el decimal se lo agrego al lef o right value
            {
                operation.leftValue += target.value;
            }else{
                operation.rightValue += target.value
            }
        }
    }

    if (target.classList.contains('equal-sign'))
    {
        resultOperations(operation.leftValue, operation.rightValue, operation.operator)
    }
   
})