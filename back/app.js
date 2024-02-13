var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var docRouter = require("./routes/doc");
var iisRouter = require("./routes/iisTest");

var app = express();

const cors = require("cors");
app.use(cors());

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
module.exports = app;
