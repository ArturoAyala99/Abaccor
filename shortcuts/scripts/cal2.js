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
    rightValue: 0
}

var display = document.getElementById("pantalla");

function numberValue(num)
{
    operation.leftValue = operation.leftValue + num;

    display.value = operation.leftValue;
    console.log(operation.leftValue);
}

$('button').on('click', function (e){

    const { target } = e;

    if (target.classList.contains('number'))
    {
        numberValue(target.value);
    }

})