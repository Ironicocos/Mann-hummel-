const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 9090 });
let users = {};
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
        console.log("El usuario ", data.name + "ha iniciado sesión.")
        handleLogin(connection, data.name);
        break;

      case "offer":
        console.log("Sending offer to: ", data.name);
        handleOffer(connection, data.offer, data.name);
        break;

      case "answer":
        console.log("Contestando a:", data.name);
        handleAnswer(connection, data.answer);
        break;

      case "candidate":
        console.log("Sending candidate to:", data.name);
        handleCandidate(connection, data.candidate);
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