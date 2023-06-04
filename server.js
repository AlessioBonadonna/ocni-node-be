const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt= require('jsonwebtoken');
const Dispositivo = require('./models/dispositivo');
const routes = require('./route');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

const port = 8000


db.authenticate()
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
