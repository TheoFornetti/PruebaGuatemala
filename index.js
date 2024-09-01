const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const port = process.env.PORT || 3001; // Usa la variable de entorno PORT para compatibilidad con servicios de despliegue
const clients = new Set();
// Crear un servidor HTTP que maneje tanto Express como WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware para analizar los datos del cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

app.post("/messageIn", (req, res) => {
  const fromNumber = req.body.From;
  console.log("Mensaje Recibido");
  console.log(fromNumber);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`Mensaje recibido de: ${fromNumber}`);
    }
  })
  res.sendStatus(200);
});

wss.on("connection", (ws) => {
  console.log("Cliente WebSocket conectado");
  clients.add(ws);

  ws.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    ws.send(`Recibido: ${message}`);
  });

  ws.on("close", () => {
    console.log("Cliente WebSocket desconectado");
  });
});

// Inicia el servidor en el puerto especificado por la variable de entorno PORT
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});
