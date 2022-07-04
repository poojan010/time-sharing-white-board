const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

app.get("/", (req, res) => {
    res.send("server");
});


// serve on port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);