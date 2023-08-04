import express from "express";
import db from "./../db.js";
const router = express.Router();
const table = "talent_presentation";

router.get("/", async (req, res, next) => {
  const q = "SELECT * FROM `" + table + "`";
  db.query(q, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/getJudgeScore", async (req, res, next) => {
  try {
    const { judgeId } = req.query;

    const q =
      "SELECT t1.number, t1.id, t2.judge, t2.score, t2.rank \
      FROM candidate t1 \
      LEFT JOIN talent_presentation t2 ON t1.id = t2.candidate  AND t2.judge = ? \
      GROUP BY t1.id;";
    db.query(q, [judgeId], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getScore", async (req, res, next) => {
  res.send(req.query);
});

router.post("/", async (req, res, next) => {
  try {
    const { judgeId, candidateId, score } = req.body;

    // Query to check if the record exists for the given judgeId and candidateId
    const countQuery = `SELECT COUNT(*) AS numRows FROM ${table} WHERE judge = ? AND candidate = ?`;

    // Use a Promise to handle the database query asynchronously
    const numRows = new Promise((resolve, reject) => {
      db.query(countQuery, [judgeId, candidateId], function (err, results) {
        if (err) {
          reject(err);
        } else {
          const length = results[0].numRows;
          resolve(length);
        }
      });
    });

    // Await the Promise to get the result
    const result = await numRows;

    if (result > 0) {
      // Update the existing record with the new score
      const updateQuery = `UPDATE ${table} SET score = ? WHERE judge = ? AND candidate = ?`;
      const updateParams = [score, judgeId, candidateId];
      await db.query(updateQuery, updateParams);
    } else {
      // Insert a new record with the judgeId, candidateId, and score
      const insertQuery = `INSERT INTO ${table} (judge, candidate, score) VALUES (?, ?, ?)`;
      const insertParams = [judgeId, candidateId, score];
      await db.query(insertQuery, insertParams);
    }

    res.status(200).json({ message: "Score saved successfully!" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
