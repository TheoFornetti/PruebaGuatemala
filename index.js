// server.js
const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
const twilio = import("twilio");
const WebSocket = require("ws");
const http = require("http");
const server = http.createServer();

// Crear un servidor WebSocket
const wss = new WebSocket.Server({ server });

const bodyParser = require("body-parser");

// Middleware para analizar los datos del cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

app.post("/messageIn", (req, res) => {
  const fromNumber = req.body.From;
  console.log("Mensaje Recivido")
  console.log(fromNumber);

  //broadcast("Hola Theo");
  res.sendStatus(200);
});

//Como vamos a hacerf para identificar los diferentes ingresos
//el qr deberia tener algo para hacerlo asi sabermos cual barrear devemos levantar
//como vamos a hacer para evitar que envien mensajes falopa
// para que no levanten la barrea seguido (Segunda opcion formulario en el servidor con autenticacion de google etc)

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // Enviar el mensaje recibido de vuelta al cliente
    ws.send(`Recibido: ${message}`);
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar el servidor HTTP en el puerto 8080
server.listen(8080, () => {
  console.log("Servidor WebSocket escuchando en ws://localhost:8080");
});
