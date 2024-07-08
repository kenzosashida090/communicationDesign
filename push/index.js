console.log("Hello CodeSandbox");
//push is a communication dessign usually used to
// real time communication we need to connect to a server
//to receive data like notification
//communication can be bidirection or unidirectional
const http = require("http");
const WebSocketServer = require("websocket").server;
let connections = [];
// create a raw http server to create the tcp communication will pass to the websocket

const httpServer = http.createServer();
// pass the httpServer instance to the websocket

const websocket = new WebSocketServer({ "httpServer": httpServer });
httpServer.listen(8080, () => {
  console.log("tuning server");

});

websocket.on("request", (request) => {
    console.log("request")
  const connection = request.accept(null, request.origin);
  connection.on("message", (message) => {
    connections.forEach((el) =>
      el.send(
        `User from ${connection.socket.remotePort} say ${message.utf8Data}`,
      ),
    );
  });
  connection.on("close",()=>{
    connections = connections.filter((el)=>el !== connection)
    connections.forEach((el)=>{
        el.send(`User from ${connection.socket.remotePort} disconnected`)
    })  
  } )
  connections.push(connection);
  connections.forEach((el) =>
    el.send(`User ${connection.socket.remotePort} just connected.`),
  );
});
