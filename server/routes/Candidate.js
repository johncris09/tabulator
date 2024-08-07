import express from "express";
import db from "./../db.js";
const router = express.Router();
const table = "candidate";

router.get("/", async (req, res, next) => {
  const q =
    "SELECT * FROM `" + table + "` ORDER BY number ASC";
  db.query(q, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// Route to insert data
router.post('/insert', (req, res) => {
  const { name, age } = req.body;
  return req;
  // if (!name || !age) {
  //   return res.status(400).send({ error: true, message: 'Please provide name and age' });
  // }

  // const query = 'INSERT INTO users (name, age) VALUES (?, ?)';
  // db.query(query, [name, age], (err, results) => {
  //   if (err) {
  //     console.error('Error inserting data:', err);
  //     return res.status(500).send({ error: true, message: 'Database error' });
  //   }
  //   res.send({ error: false, message: 'Data inserted successfully', data: results });
  // });
});

export default router;
