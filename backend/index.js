const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ----------- MOCK DATA ----------- */

const users = [
  {
    id: 1,
    name: "John Manager",
    email: "manager@company.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: 2,
    name: "Jane Employee",
    email: "employee@company.com",
    password: "employee123",
    role: "employee",
  },
];

let tasks = [
  {
    id: 1,
    title: "Q4 Financial Report",
    assignedTo: "Jane Employee",
    assignedToId: 2,
    status: "completed",
    dueDate: "2026-01-15",
    priority: "high",
  },
  {
    id: 2,
    title: "Client Presentation",
    assignedTo: "Jane Employee",
    assignedToId: 2,
    status: "in-progress",
    dueDate: "2026-01-20",
    priority: "high",
  },
];

/* ----------- ROUTES ----------- */

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running" });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: "fake-jwt-token",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// Get tasks
app.get("/api/tasks", (req, res) => {
  const { userId, role } = req.query;

  if (role === "employee") {
    return res.json(tasks.filter((t) => t.assignedToId == userId));
  }

  res.json(tasks);
});

// Update task status
app.put("/api/tasks/:id", (req, res) => {
  const { status } = req.body;
  const taskId = req.params.id;

  tasks = tasks.map((task) =>
    task.id == taskId ? { ...task, status } : task
  );

  res.json({ success: true });
});

// Create new task
app.post("/api/tasks", (req, res) => {
  const newTask = {
    ...req.body,
    id: Date.now(),
  };

  tasks.push(newTask);
  res.json(newTask);
});

/* ----------- START SERVER ----------- */

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
