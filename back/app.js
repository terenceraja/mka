var express = require("express");
var path = require("path");
var http = require("http");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
var docRouter = require("./routes/doc");
var collabsRouter = require("./routes/collabs");
var newsRouter = require("./routes/news");
var iisRouter = require("./routes/iisTest");
var messageRouter = require("./routes/message");
var chatRouter = require("./routes/chat");
var filemakerRouter = require("./routes/filemaker");

var app = express();

const cors = require("cors");
// Allow requests from both http://localhost:5173 and http://localhost:5500
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); ////////////////////////////////////// FALSE ORIGINALY
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

// // ///////// IIS CONFIG ///////////
// app.listen(process.env.PORT);

module.exports = { app, http }; // Export both the app and the http server
