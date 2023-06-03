const express = require("express");
const db = require("./db").promise();
const bcrypt = require("bcrypt");
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt= require('jsonwebtoken');


const app = express();
app.use(cors())
app.use(bodyParser.json()) 
 app.use(bodyParser.urlencoded({ extended: true}))

app.get("/test", cors(), (req, res) => {
  res.json({ msg: "CORS enabled!" })
})
/* TO DO
Registrazione
Login */

app.post("/register", cors(), async (req, res) => {
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
  }catch (err) {  
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

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    // Verifica l'email e la password
    const user = await validateUser(email, password) 
    if(!user) {
      return res.status(401).send('Credenziali non valide')
    }
    // Genera il token
    const token = jwt.sign({ id: user.id }, 'your_secret_key')
    res.json({ user, token })
  } catch (err) {
    console.error(err)
    res.status(500).send('Errore sul server')      
  }
})
app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
