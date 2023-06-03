const mysql = require("mysql2");



const db = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "ocni"
});
async function validateUser(email, password) {
    // Recupera l'utente dal database in base all'email
    const user = await getUserByEmail(email)
    
    // Verifica la password
    const isValid = bcrypt.compare(password, user.password)
    if (isValid) {
      return user
    }  
    return null
  }
db.connect();
// console.log(db);
console.log('DB CONNECTED');

module.exports = db;