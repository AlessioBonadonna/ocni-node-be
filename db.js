const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "ocni"
});

db.connect((err) => {
  if (err) {
    console.error("Errore durante la connessione al database:", err);
    return;
  }
  console.log("Connessione al database stabilita correttamente");
});

module.exports = db;
