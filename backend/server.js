const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let currentId = 1;
const tasks = [];

app.post('/tasks', (req, res) => {
  const { title, description = '' } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Task title is required.' });
  }

  const task = {
    id: currentId++,
    title: title.trim(),
    description: description.trim(),
    status: 'Pending',
    created_at: new Date().toISOString()
  };

  tasks.push(task);
  return res.status(201).json(task);
});

app.get('/tasks', (_req, res) => {
  return res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  task.status = 'Completed';
  return res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  tasks.splice(index, 1);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
