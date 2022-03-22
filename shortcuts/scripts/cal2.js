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

function addDecimal(dot)
{

    if (operation.leftValue === display.value) {
        // Append the decimal point
        if (!operation.leftValue.includes(dot))
        {
            // Append the decimal point
            display.value += dot;
            operation.leftValue += dot;
        }
        
    } 
    
    if (!operation.rightValue.includes(dot) && !display.value.includes(dot))
    {
        if (!operation.right.includes(dot))
        {
            // Append the decimal point
            display.value += dot;
            operation.rightValue += dot;
        }
    }

    /* if (display.value === operation.leftValue) { //si esto posicionado en el left value entonces..
        if (!operation.leftValue.includes(dot))
        {
            // Append the decimal point
            operation.leftValue += dot;
            display.value = operation.leftValue;
        }
    }

    if (display.value === operation.rightValue) { //si esto posicionado en el right value entonces..
        if (!operation.rightValue.includes(dot))
        {
            // Append the decimal point
            operation.rightValue += dot;
            display.value = operation.rightValue;
        }
    } */

   /*  if (!display.value.includes(target.value)) {
        // Append the decimal point
        display.value += target.value;

        if (operation.operator === '') //validar si el decimal se lo agrego al lef o right value
        {
            operation.leftValue += target.value;
        }else{
            operation.rightValue += target.value
        }
    } */ 
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

        case '*':
            result = num1 * num2;
            display.value = result;
                        
            break;

        case '/':
            result = num1 / num2;
            display.value = result;
                        
            break;
    }
    operation.leftValue = result;
    operation.rightValue = '';
    
}

$('button').on('click', function (e){

    const { target } = e;


    if (target.classList.contains('operator') )
    {
        if (operation.operator != '' && operation.leftValue != '' && operation.rightValue != '') //validar que haya puesto un operador en lugar del signo "="
        {
            resultOperations(operation.leftValue, operation.rightValue, operation.operator)

        }
        
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
        }
        else{
            numberValue(target.value);
        }
    }

    if (target.classList.contains('decimal') )
    {
        // If the `displayValue` does not contain a decimal point
        addDecimal(target.value);
       
    }

    if (target.classList.contains('equal-sign'))
    {
        if (operation.rightValue === '') //validar que no haya puesto un valor al rightValue
        {
            operation.rightValue = '0';
        }

        resultOperations(operation.leftValue, operation.rightValue, operation.operator)
        
        
       
    }

    if (target.classList.contains('all-clear'))
    {
      operation.leftValue = '';
      operation.operator = '';
      operation.rightValue = '';

      display.value = "0";
    }

    if (target.classList.contains('clear'))
    {
        if (display.value === operation.leftValue)
        {
            operation.leftValue = operation.leftValue.slice(0,-1); //eliminar el último valor 
            display.value = operation.leftValue;
        }

        if (display.value === operation.rightValue)
        {
            operation.rightValue = operation.rightValue.slice(0,-1); //eliminar el último valor 
            display.value = operation.rightValue;
        }
        
    }
   
})

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
        67: "c", //cerrar calculadora
        8: "clear", //el backspace para eliminar un valor y no todos como el "all clear"
        
        
        
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
        //console.log(valor);
        
    }
})