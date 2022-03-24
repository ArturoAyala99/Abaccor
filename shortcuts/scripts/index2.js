$('#boton').on('keydown', function (e) {
    if (e.keyCode === 67 || (e.keyCode === 67 && e.keyCode === 17)) { //Si aprieta "c" o ctrl+c
        
        //window.open("calculadora/cal.html");
        //document.getElementById("cal-container").hidden = false; //Aparecer calculadora
        $('#myModal').modal('show');

        resultado = document.getElementById('boton');
        console.log(resultado);
    }
})

var resultado = require('./cal2.js')