"use strict";var result,validar,rvalue,operation={leftValue:"",operator:"",rightValue:""},display=document.getElementById("pantalla"),displayHistorial=document.getElementById("historial"),displayInput=document.getElementById("input");function numberValue(e){operation.leftValue=operation.leftValue+e,display.value=operation.leftValue,console.log("left value:"+operation.leftValue)}function numberValue2(e){operation.rightValue=operation.rightValue+e,display.value=operation.rightValue,console.log("right value:"+operation.rightValue)}function addDecimal(e){""===operation.operator?operation.leftValue.includes(e)||(operation.leftValue+=e,display.value=operation.leftValue):operation.rightValue.includes(e)||(operation.rightValue+=e,display.value=operation.rightValue)}function resultOperations(e,a,o){switch(e=parseFloat(operation.leftValue),a=parseFloat(operation.rightValue),o){case"+":result=e+a,display.value=result;break;case"-":result=e-a,display.value=result;break;case"*":result=e*a,display.value=result;break;case"/":result=e/a,display.value=result}operation.leftValue=result,operation.rightValue=""}function historial(e){validar!=operation.leftValue&&"="===e.value?displayHistorial.innerHTML=validar+" "+operation.operator+" "+rvalue+" "+e.value:(displayHistorial.innerHTML=operation.leftValue+" "+operation.operator+" "+operation.rightValue,rvalue=operation.rightValue),validar=operation.leftValue}$("button").on("click",function(e){e=e.target;if(e.classList.contains("operator")&&(""!=operation.operator&&""!=operation.leftValue&&""!=operation.rightValue&&resultOperations(operation.leftValue,operation.rightValue,operation.operator),""===operation.leftValue?(operation.leftValue="0",operation.operator=e.value,console.log("left:"+operation.leftValue+"op:"+operation.operator)):operation.operator=e.value),e.classList.contains("number")&&("0"===operation.leftValue||""!=operation.operator?numberValue2:numberValue)(e.value),e.classList.contains("decimal")&&addDecimal(e.value),e.classList.contains("equal-sign")){if(""===operation.leftValue||""===operation.operator||""===operation.rightValue)return;""!==operation.leftValue&&""!==operation.operator&&""!==operation.rightValue||(display.value="0"),resultOperations(operation.leftValue,operation.rightValue,operation.operator),$("#myModal").modal("hide"),displayInput.value=result.toFixed(3)}e.classList.contains("all-clear")&&(operation.leftValue="",operation.operator="",operation.rightValue="",display.value="0"),e.classList.contains("clear")&&(display.value===operation.leftValue&&(operation.leftValue=operation.leftValue.slice(0,-1),display.value=operation.leftValue),display.value===operation.rightValue&&(operation.rightValue=operation.rightValue.slice(0,-1),display.value=operation.rightValue)),historial(e)}),$("body").on("keydown",function(e){var a;$("#myModal").hasClass("in")&&(null!=(a={13:"=",187:"+",189:"-",80:"*",68:"/",190:".",32:"all-clear",67:"c",8:"clear",48:0,49:1,50:2,51:3,52:4,53:5,54:6,55:7,56:8,57:9,107:"+",109:"-",110:".",111:"/",106:"*",96:0,97:1,98:2,99:3,100:4,101:5,102:6,103:7,104:8,105:9}[e.keyCode])&&$(" button[value = '"+a+"' ] ").trigger("click"),e.preventDefault())}),$("#input").on("keydown",function(e){(67===e.keyCode||67===e.keyCode&&17===e.keyCode)&&$("#myModal").modal("show")});