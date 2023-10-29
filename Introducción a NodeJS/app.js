const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const people = require("./json/people.json"); // Importa los datos iniciales (generados en https://www.mockaroo.com/)

app.get("/", (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/people", (req, res) => {
  res.json(people); 
});

app.get("/people/:index", (req, res) => {
  res.json(people[req.params.index]); 
});

app.post("/people", (req, res) => {
  people.push(req.body); 

  res.json(req.body); 
});

app.put("/people/:index", (req, res) => {
  let index = req.params.index; 

  for (let property in req.body) {
    people[index-1][property] = req.body[property];
  } 

  res.json(people); 
});

app.delete("/people/:index", (req, res) => {
  let index = parseInt(req.params.index);

  if (index >= 0 && index < people.length) {
    people.splice(index-1, 1);
  }
  res.json(people);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
