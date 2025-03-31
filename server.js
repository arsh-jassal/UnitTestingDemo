require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample in-memory database
const todos = [];

// Routes
app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.post("/todos", (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });

    const newTodo = { id: todos.length + 1, task, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    todo.completed = req.body.completed;
    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Todo not found" });

    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
