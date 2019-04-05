var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");

var app = express();
require("./models");

// view engine setup
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "../client/build/"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());



var usersRouter = require("./routes/users");
var eventsRouter = require("./routes/events");
var indexRouter = require("./routes/index");

app.use("/api/v1/user", usersRouter);
app.use("/api/v1/event", eventsRouter);

app.use(
  "/static",
  express.static(path.join(__dirname, "../client/build/static/"))
);
app.use("/", indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
