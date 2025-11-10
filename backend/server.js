const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let todos = [];
let id = 1;

app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
    const todo = { id: id++, text: req.body.text };
    todos.push(todo);
    res.json(todo);
});
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) return res.status(404).send();
    todo.text = req.body.text;
    res.json(todo);
});
app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(t => t.id != req.params.id);
    res.sendStatus(204);
});

app.listen(5000, () => console.log("Server running on 5000"));
