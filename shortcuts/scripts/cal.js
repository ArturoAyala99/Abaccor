$('body').on("keydown", function(e) {
    console.log(e);
    var cal = document.getElementById("print");
    /*if (e.keyCode === 67) {

        cal.focus();
    }*/

    if (e.keyCode === 96) { //imprime 0
        cal.focus();
    }
})

$('button').on("click", function numeros(e) {

    if (e.keyCode === 103) { //imprime 0
        cal.focus();
    }


})
