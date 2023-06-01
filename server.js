const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Server is running");
});

/* TO DO
Registrazione
Login */

app.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, hashPassword, name]
    );
    const user = {
      id: result.insertId,
      name: name,
      email: email,
    };
    const token = jwt.sign({ id: user.id }, "your_secret_key");
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in /register", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
