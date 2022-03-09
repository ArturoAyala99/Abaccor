$('button').on("keydown", function shortcuts(e) {
    if (e.keyCode === 67) {

        window.open("calculadora/cal.html");
        e.preventDefault();
    }
})