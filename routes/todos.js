const express = require("express");
const router = express.Router();

let todos = [];
let idCounter = 1;

// Create a To-Do
router.post("/", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    const newTodo = { id: idCounter++, task, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Get All To-Dos
router.get("/", (req, res) => {
    res.json(todos);
});

// Update a To-Do
router.put("/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todo.completed = req.body.completed ?? todo.completed;
    res.json(todo);
});

// Delete a To-Do
router.delete("/:id", (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
});

module.exports = router;
