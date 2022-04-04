$('#input').on('keydown', function (e) {
    if (e.keyCode === 67 || (e.keyCode === 67 && e.keyCode === 17)) { //Si aprieta "c" o ctrl+c
        
        //window.open("calculadora/cal.html");
        //document.getElementById("cal-container").hidden = false; //Aparecer calculadora
        $('#myModal').modal('show');

        //console.log(resultado);
    }

})

