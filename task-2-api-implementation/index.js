// index.js -  SIMPLE TASK  MANAGEMENT API
const express = require('express');
const app = express();

// This helps us read JSON data from requests
app.use(express.json());

// Our fake database (just an array)
let tasks = [];
let nextId = 1;

// Helper function to get current user from header
function getCurrentUserId(req) {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    throw new Error('Missing x-user-id header');
  }
  return Number(userId);
}

// 1. CREATE TASK - POST /tasks
app.post('/tasks', (req, res) => {
  try {
    const currentUser = getCurrentUserId(req);
    const { title, priority, assignedTo } = req.body;

    if (!title || !priority || !assignedTo) {
      return res.status(400).json({ error: 'title, priority and assignedTo are required' });
    }
    if (assignedTo === currentUser) {
      return res.status(400).json({ error: 'You cannot assign task to yourself' });
    }

    const newTask = {
      id: nextId++,
      title,
      priority,
      status: 'pending',
      assignedTo: Number(assignedTo),
      assignedBy: currentUser,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. GET ALL TASKS - GET /tasks
app.get('/tasks', (req, res) => {
  try {
    getCurrentUserId(req); // just check user exists
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. UPDATE TASK DETAILS (title, priority) - only assigner
app.patch('/tasks/:id', (req, res) => {
  try {
    const currentUser = getCurrentUserId(req);
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (task.assignedBy !== currentUser) {
      return res.status(403).json({ error: 'Only the assigner can edit this' });
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.priority) task.priority = req.body.priority;

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. UPDATE STATUS - only assignee
app.patch('/tasks/:id/status', (req, res) => {
  try {
    const currentUser = getCurrentUserId(req);
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (task.assignedTo !== currentUser) {
      return res.status(403).json({ error: 'Only the assignee can change status' });
    }

    const newStatus = req.body.status;
    if (!['pending', 'in-progress', 'completed'].includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    task.status = newStatus;
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. UNASSIGN - only assigner
app.patch('/tasks/:id/unassign', (req, res) => {
  try {
    const currentUser = getCurrentUserId(req);
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (task.assignedBy !== currentUser) {
      return res.status(403).json({ error: 'Only assigner can unassign' });
    }
    task.assignedTo = null;
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 6. DELETE - only assigner
app.delete('/tasks/:id', (req, res) => {
  try {
    const currentUser = getCurrentUserId(req);
    const taskIndex = tasks.findIndex(t => t.id === Number(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

    if (tasks[taskIndex].assignedBy !== currentUser) {
      return res.status(403).json({ error: 'Only assigner can delete' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🎉 Server is running! Open: http://localhost:${PORT}`);
});