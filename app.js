//This file is the main application setup file for an Express.js application.
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const exphbs = require("express-handlebars");

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();

// In-memory todos storage
let todos = [];  // Use the same in-memory todos array

// View Engine Setup (Handlebars)
app.engine("hbs", exphbs.engine({ extname: "hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/todos", todosRouter); // Using the todosRouter to manage todos

// Catch 404 and Forward to Error Handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

