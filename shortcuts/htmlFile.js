const http = require("http");
const fs = require('fs').promises; //este módulo contiene una función readFile() que usaremos para cargar el archivo HTML.

const host = 'localhost'; //variables para crear el servidor
const port = 8000;

const requestListener = function (req, res) { //traer el archivo index2.html
    
    fs.readFile(__dirname + "/dist/scripts/cal.js")
    fs.readFile(__dirname + "/index2.html") //Usamos el método fs.readFile() para cargar el archivo. Su argumento tiene __dirname + "/index.html"
    //La variable especial __dirname tiene la ruta absoluta de donde se está ejecutando el código Node.js 

    .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Set Cookies", "type=ninja", "language=javascript");
        res.writeHead(200);
        res.end(contents);
    })
    .catch(err => { //El método fs.readFile() puede fallar a veces, de modo que deberíamos gestionar este caso cuando obtengamos un error. 
        res.writeHead(500);
        res.end(err);
        return;
    }); 
  
}; 

const server = http.createServer(requestListener); //crear el servidor
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

