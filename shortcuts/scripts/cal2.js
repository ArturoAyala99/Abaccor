var num1 = [];
var num2 = [];
var operator;
var display = document.getElementById("pantalla");

function number(num)
{
    if (num === "+" || num === "-" || num === "*" || num === "/")
    {
        display.value = "0";
        num2 = num2 + num;
        display.value= num2;
        console.log("num2 = " + num2);
    }
    else
    {
        num1 = num1 + num;
        display.value= num1;
        console.log("num1 = " + num1);
    }
    
    
}

$('button').on('click', function (e){

    const { target } = e;

    if ( target.classList.contains('number') || target.classList.contains('operator'))
    {
        number(target); 
    }
    
    
})