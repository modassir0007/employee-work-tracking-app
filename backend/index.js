const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "John Manager", email: "manager@company.com", password: "manager123", role: "manager" },
  { id: 2, name: "Jane Employee", email: "employee@company.com", password: "employee123", role: "employee" }
];

let tasks = [
  { id: 1, title: "Q4 Report", assignedTo: "Jane Employee", assignedToId: 2, status: "completed", dueDate: "2026-01-15", priority: "high" },
  { id: 2, title: "Client Presentation", assignedTo: "Jane Employee", assignedToId: 2, status: "in-progress", dueDate: "2026-01-20", priority: "high" }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: "fake-token",
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

app.get("/api/tasks", (req, res) => {
  const { userId, role } = req.query;
  if (role === "employee") {
    return res.json(tasks.filter(t => t.assignedToId == userId));
  }
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
