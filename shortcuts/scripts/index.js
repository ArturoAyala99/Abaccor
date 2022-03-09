$('button').on("keydown", function shortcuts(e) {

    if (e.keyCode === 67) { //Si aprieta el keyCode 67 (letra c)

        window.open("calculadora/cal.html");
        e.preventDefault();
    }
})