const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const exphbs = require("express-handlebars"); // Add express-handlebars

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos"); // New To-Do API Router

const app = express();

// View Engine Setup (Handlebars)
app.engine("hbs", exphbs({
    extname: "hbs",
    defaultLayout: "main",  // Default layout file 'main.hbs' in the layouts folder
    layoutsDir: path.join(__dirname, "views", "layouts")  // Explicitly set the layouts directory
}));
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
app.use("/todos", todosRouter); // Use the To-Do API

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
