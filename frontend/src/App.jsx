import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const login = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "manager@company.com",
        password: "manager123"
      })
    });

    const data = await res.json();
    setUser(data.user);
  };

  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/tasks?userId=${user.id}&role=${user.role}`)
      .then(res => res.json())
      .then(setTasks);
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Employee Work Tracking App</h2>
        <button onClick={login}>Login as Manager</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Welcome {user.name}</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — <b>{task.status}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
