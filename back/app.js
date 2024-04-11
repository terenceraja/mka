// In app.js

const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const docRouter = require("./routes/doc");
const collabsRouter = require("./routes/collabs");
const newsRouter = require("./routes/news");
const iisRouter = require("./routes/iisTest");
const messageRouter = require("./routes/message");
const chatRouter = require("./routes/chat");
const filemakerRouter = require("./routes/filemaker");

const app = express();

const cors = require("cors");
// Allow requests from both http://localhost:5173 and http://localhost:5500
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/doc", docRouter);
app.use("/collabs", collabsRouter);
app.use("/news", newsRouter);
app.use("/message", messageRouter);
app.use("/chat", chatRouter);
app.use("/iis", iisRouter);
app.use("/filemaker", filemakerRouter);


//// // // // // // // // // // // // // // // // // ////// // // // // // // // // // // // // // // // // // // // // // ///
//// // // // // // // // // // // // // // // // // //  SOCKET CONFIG // / // // // // // // // // // // // // // // // // //
//// // // // // // // // // // // // // // // // // ////// // // // // // // // // // // // // // // // // // // // // // ///


// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5500", "https://mykeeapp.keesystem.com"],
    methods: ["GET", "POST"],
  },
});




//// // // // // // // // // // // // // // // // // ////// // // // // // // // // // // // // // // // // // // // // // //
//// // // // // // // // // // // // // // // // // //  SOCKET EVENTS  // // // // // // // // // // // // // // // // // //
//// // // // // // // // // // // // // // // // // ////// // // // // // // // // // // // // // // // // // // // // // //


// Socket.IO event handling
let onlineUsers = [];
io.on("connection", (socket) => {
  console.log(`socket connection ${socket.id}`);

  // JOIN CHAT/ROOM
  socket.on("joinRoom", (IdChat) => {
    console.log(IdChat);
    console.log(`USER JOINED ROOM : ${IdChat}`);
    socket.join(IdChat);
    // socket.join([10]);
  });

  // SENDING MESSAGE
  socket.on("sendMessage", (data) => {
    console.log("THE ROOM TO SEND TO", data.messageToSend.IdChat);

    // Get the list of sockets in the room
    const socketsInRoom = io
      .of("/")
      .adapter.rooms.get(data.messageToSend.IdChat);

    // Emit the message to all sockets in the room except the sender's socket
    if (socketsInRoom) {
      for (const socketId of socketsInRoom) {
        if (socketId !== socket.id) {
          io.to(socketId).emit("getMessage", data.messageToSend);
        }
      }
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("onlineUsers", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });

  // ADD ONLINE USERS
  socket.on("addNewUser", (userData) => {
    console.log("USER DATA");
    const existingUser = onlineUsers.find(
      (user) => user.IdUser === userData.IdUser
    );
    if (existingUser) {
      existingUser.socketId = socket.id;
    } else {
      onlineUsers.push({
        IdUser: userData.IdUser,
        Room: userData.room,
        userType: userData.userType,
        socketId: socket.id,
      });
    }
    console.log("onlineUsers", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });
});



//// // // // // // // // // // // // // // // // // ////// // // // // // // // // // // // // // // // // // // // // // //
//// // // // // // // // // // // // // // // // // //  PORT CONFIG /  // // // // // // // // // // // // // // // // // //
//// // // // // // // // // // // // // // // // // ////// // // // // // // // // // // // // // // // // // // // // // //

// Listen on provided port
const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Server is listening on " + bind);
}

module.exports = app;
