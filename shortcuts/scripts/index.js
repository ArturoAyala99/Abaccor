$('button').on("keydown", function shortcuts(e) {

    if (e.keyCode === 67) { //Si aprieta el keyCode 67 (letra c)
        
        //window.open("calculadora/cal.html");
        //document.getElementById("cal-container").hidden = false; //Aparecer calculadora
        $('#cal-container').fadeToggle(300);//Aparecer calculadora
        e.preventDefault();
    }
})