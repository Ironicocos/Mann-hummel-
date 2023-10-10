const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 9090 });
let users = {};
function sendTo(connection, message) {
  connection.send(JSON.stringify(message));
}
wss.on('connection', function (connection) {
  console.log('Un usuario se ha conectado');
  connection.on('close', function () {
    if (connection.name) {
      delete users[connection.name];

      if(connection.otherName){
        console.log("Desconectándose de ", connection.otherName);
        var conn = users[connection.otherName];
        conn.otherName = null;

        if(conn != null) {
          sendTo(conn, {
            type:"leave"
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
      data = {};
    }
    switch (data.type) {
      case "login":
        console.log("El usuario ", data.name + "ha iniciado sesión.")
        if (users[data.name]) {
          sendTo(connection, {
            type: "login",
            success: false
          });
        } else {
          users[data.name] = connection;
          connection.name = data.name;

          sendTo(connection, {
            type: "login",
            success: true
          });
        }
        break;

      case "offer":
        console.log("Sending offer to: ", data.name);

        var conn = users[data.name];

        if (conn != null) {
          connection.otherName = data.name;
          sendTo(conn, {
            type: "offer",
            offer: data.offer,
            name: connection.name
          });
        }

        break;

      case "answer":
        console.log("Contestando a:", data.name);
        var conn = users[data.name];

        if (conn != null) {
          connection.otherName = data.name;
          sendTo(answer, {
            type: "answer",
            offer: data.answer
          });
        }

        break;

      case "candidate":
        console.log("Sending candidate to:",data.name);
        var conn = users[data.name];
        if(conn !=null){
          sendTo(conn, {
            type:"candidate",
            candidate: data.candidate
          })
        }

        break;

        case "leave":
          console.log("Desconectándose de:", data.name);
          var conn = users[data.name];
          conn.otherName = null;

          if(conn != null){
            sendTo(conn, {
              type: "leave"
            })
          }

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