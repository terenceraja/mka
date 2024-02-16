var express = require("express");
var http = require("http");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var docRouter = require("./routes/doc");
var iisRouter = require("./routes/iisTest");

var app = express();

const cors = require("cors");
// Allow requests from both http://localhost:5173 and http://localhost:5500
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/doc", docRouter);
app.use("/iis", iisRouter);

///////// IIS CONFIG ///////////
app.listen(process.env.PORT);

// Include Socket.IO

module.exports = { app, http }; // Export both the app and the http server
