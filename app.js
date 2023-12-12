var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
require("./db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var users = require("./controller/user");
var orders = require("./controller/ordersList");
var products = require("./controller/productsList");
var userApprove = require("./controller/userApprove");
var auth = require("./middleware/jwt_auth");
// var usersRegister = require("./controller/userRegis");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/v1", users);
app.use("/api/v1", auth, userApprove);
app.use("/api/v1", auth, products);
app.use("/api/v1", auth, orders);
// app.use("/api/v1", userApprove);
// app.use("/api/v1", usersRegister);
// app.use("/api/v1", productsCreate);

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
