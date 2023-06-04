const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Dispositivo = require('./models/dispositivo');
const cors = require('cors'); 

router.post("/register", cors(), async (req, res) => {
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
  } catch (err) {  
    if(err.errno === 1062) {
      res.status(400).json({error: "Username already exists"})
    } else {   
      console.error(err)  
      res.status(500).json({
        error: "An unexpected error occurred. Please try again later."
      })
    }  
  }
});

router.post("/login", cors(), async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const user = result[0][0];
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    console.log('sono la password del utente ',user.password);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ id: user.id }, "your_secret_key");
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later."
    });
  }
});
router.get("/dispositivi", cors(), async (req, res) => {
    try {
        const dispositivi = await Dispositivo.findAll({
            attributes: ['id', 'nome', 'marca', 'modello', 'createdAt', 'updatedAt', 'user_id'], // Modifica il nome del campo corrispondente nel database
        });
        res.json(dispositivi);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An unexpected error occurred. Please try again later." });

    }
  });
  router.post("/creadispositivo", cors(), async (req,res)=>{
    try {
    const { nome, marca, modello } = req.body;
    const result = await db.query(
        "INSERT INTO users (nome, marca , modello) VALUES (?, ?, ?)",
        [nome, marca, modello]
      );
      const dispositivo = {
        id: result.insertId,
        name: name,
        email: email,
      };
      res.json({
        dispositivo: {
          id: dispositivo.id,
          name: dispositivo.name,
          marca: dispositivo.marca,
          modello: dispositivo.modello
        }
      });
    }catch(error){
        console.log(error);
    }
  })


module.exports = router;
