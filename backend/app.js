var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var homeRouter = require("./routes/home");
var createRouter = require("./routes/create");
var deleteRouter = require("./routes/delete");
var commentsLoadRouter = require("./routes/loadComments");
var addCommentRouter = require("./routes/addComment");
var commentRouter = require("./routes/comment");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/home", homeRouter);
app.use("/api/create", createRouter);
app.use("/api/delete", deleteRouter);
app.use("/api/read", commentsLoadRouter);
app.use("/api/addcomment", addCommentRouter);
app.use("/api/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
