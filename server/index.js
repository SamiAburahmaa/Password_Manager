const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const port = 3001;

const { encrypt, decrypt } = require('./Encryption');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: "passwordmanager"
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.post('/addpassword', (req, res) => {
  const { password, title } = req.body;
  const hashedPassword = encrypt(password);

  db.query(
    "INSERT INTO passwords (password, title, iv) VALUES (?, ?, ?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting data");
      } else {
        res.send("success");
      }
    }
  );
});

app.get("/listpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  const { password, iv } = req.body;
  const decryptedPassword = decrypt({ password, iv });
  res.send(decryptedPassword);
});

app.delete("/deletepassword/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Request to delete password with id: ${id}`); // Log the request

  db.query("DELETE FROM passwords WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting data");
    } else {
      console.log(result); // Log the result
      res.send("success");
    }
  });
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
