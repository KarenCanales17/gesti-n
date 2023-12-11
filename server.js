const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

// app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/Login.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/views/Login.html");
});

app.get("/registro", (req, res) => {
  res.sendFile(__dirname + "/public/views/Registro.html");
});

app.get("/tareas", (req, res) => {
  res.sendFile(__dirname + "/public/views/tareas.html");
});

app.get("/seccion-tarea", (req, res) => {
  res.sendFile(__dirname + "/public/views/seccion-tarea.html");
});

app.get("/notas", (req, res) => {
  res.sendFile(__dirname + "/public/views/notas.html");
});

app.get("/cronograma", (req, res) => {
  res.sendFile(__dirname + "/public/views/cronograma.html");
});

app.get("/inicio", (req, res) => {
  res.sendFile(__dirname + "/public/views/inicio.html");
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/.html");
// });

app.get("/videollamada/", (req, res) => {
  res.sendFile(__dirname + "/public/views/room.html");
});

app.get("/videollamada/room/", (req, res) => {
  res.redirect(`/videollamada/room/${uuidV4()}`);
});

app.get("/videollamada/room/:room", (req, res) => {
  // res.render("room", { roomId: req.params.room });
  res.sendFile(__dirname + "/public/views/room-call.html");
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(3000, () => {
  console.log("Server on port 3000");
});
