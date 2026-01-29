import cors from "cors";


import { pool } from "./db";

import express from "express";

const app = express();

// This lets the server read JSON data
app.use(express.json());
app.get("/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.post("/tasks", async (req, res) => {
  const { title, description, due_date } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *",
      [title, description, due_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to save task" });
  }
});
app.get("/test", (req, res) => {
  res.send("Backend is working");
});


// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
