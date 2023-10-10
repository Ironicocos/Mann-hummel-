const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const socketIO = require('socket.io');
const signaling = require('./signaling.js');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const io = socketIO(server);

const socketsModule = require('./index');
socketsModule(io);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root:'./'});
});

app.get('/:fileName', (req,res)=>{
    const fileName = req.params.fileName;
    res.sendFile(fileName , {root: './'})
})
app.get('/canvas/:scritpName' , (req,res) =>{
    const scriptName = req.params.scritpName;
    res.sendFile(scriptName, {root: './canvas/'})
})

app.get('/Icons/:imageName', (req, res) =>{
    const imageName = req.params.imageName;
    res.sendFile(imageName, {root: './Icons/'})
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

function sendTo(connection, message) {
  connection.send(JSON.stringify(message));
}
wss.on('connection', function (connection) {
  console.log('Un usuario se ha conectado');
  connection.on('close', function () {
    if (connection.name) {
      delete users[connection.name];

      if (connection.otherName) {
        console.log("Desconectándose de ", connection.otherName);
        var conn = users[connection.otherName];
        conn.otherName = null;

        if (conn != null) {
          sendTo(conn, {
            type: "leave"
          });
        }
      }
    }
  })

  connection.on('message', function (message) {
    let data;

    try {
      data = JSON.parse(message);
    } catch (e) {
      console.log("Invalid JSON");
      return;
    }
    switch (data.type) {
      case "login":
        signaling.handleLogin();
        break;

      case "offer":
        signaling.handleOffer();
        break;

      case "answer":
        signaling.handleAnswer();
        break;

      case "candidate":
        signaling.handleCandidate();
        break;

      default:
        sendTo(connection, {
          type: "error",
          message: "Evento no encontrado " + data.type
        });

        break;
    }
  });
});