import express from "express";
import db from "./../db.js";
const router = express.Router();
const table = "swim_wear";

router.get("/", async (req, res, next) => {
  const q = `SELECT * FROM ${table}`;
  db.query(q, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/getJudgeScore", async (req, res, next) => {
  try {
    const { judgeId } = req.query;

    const q = `
    SELECT
        c.id as id,
        c.number as number,
        c.name as name,
        sw.score as sw_score,
        sw.rank as sw_rank,
        tf.score as tf_score,
        tf.rank as tf_rank
    FROM
        candidate c
    LEFT JOIN ${table} sw ON
        sw.candidate = c.id AND sw.judge = ?
    LEFT JOIN top_five tf ON
        tf.candidate = c.id AND tf.judge = ?
    ORDER BY
    c.number`;
    db.query(q, [judgeId, judgeId, judgeId], (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getConsolidatedScoreAndRank", async (req, res, next) => {
  try {
    // update rank every time score is updated of that judge
    const query = `SELECT * FROM ${table} where judge = 0  ORDER BY score asc`;
    // calculate ranking in specici judge and candidate
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      let rank = 0;
      let lastScore = false;
      let rows = 0;
      const y = []; // rank handler
      const x = []; // candidate handler

      result.forEach((row) => {
        if (row.score !== null) {
          rows++;
          if (lastScore !== row.score) {
            lastScore = row.score;
            rank = rows;
          }
          x.push({
            id: row.id,
            candidate: row.candidate,
            rank: rank,
          });

          y.push(rank);
        }
      });

      // const uarr = [...new Set(y)];
      // const duplicate = y.filter((value, index, self) => self.indexOf(value) !== index);
      const arr = y.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      let index = 0;
      let average = 0;

      for (const key in arr) {
        if (arr[key] > 1) {
          index = key - 1;
          let tot = 0;
          for (let j = 0; j < arr[key]; j++) {
            index++;
            tot += index;
          }
          average = tot / arr[key];
          index = key - 1;
          for (let j = 0; j < arr[key]; j++) {
            x[index].rank = average;
            index++;
          }
        }
      }

      x.forEach((row) => {
        const updateQuery = `UPDATE ${table} SET rank = ? WHERE id = ?`;
        const updateParams = [row.rank, row.id];
        db.query(updateQuery, updateParams);
      });
    });

    const q = `SELECT
        c.number as number,
        c.name as name,
        c.name AS candidate,
        MAX(
            CASE
                WHEN tp.judge = 2 THEN tp.rank
            END
        ) AS judge1,
        MAX(
            CASE
                WHEN tp.judge = 4 THEN tp.rank
            END
        ) AS judge2,
        MAX(
            CASE
                WHEN tp.judge = 5 THEN tp.rank
            END
        ) AS judge3,
        MAX(
            CASE
                WHEN tp.judge = 6 THEN tp.rank
            END
        ) AS judge4,
        MAX(
            CASE
                WHEN tp.judge = 7 THEN tp.rank
            END
        ) AS judge5,
        SUM(
            CASE
                WHEN tp.judge = 0 THEN tp.score
                ELSE 0
            END
        ) AS total_score,
        MAX(
            CASE
                WHEN tp.judge = 0 THEN tp.rank
                else 0
            END
        ) AS final_rank
      FROM
          ${table} tp
          JOIN candidate c ON tp.candidate = c.id
      GROUP BY
          c.name
      ORDER BY
      c.id ASC`;

    db.query(q, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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

    // update rank every time score is updated of that judge
    const query = `SELECT * FROM ${table} where judge = ?  ORDER BY score DESC`;
    // calculate ranking in specici judge and candidate
    db.query(query, [judgeId], (err, result) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      let rank = 0;
      let lastScore = false;
      let rows = 0;
      const y = []; // rank handler
      const x = []; // candidate handler

      result.forEach((row) => {
        rows++;
        if (lastScore !== row.score) {
          lastScore = row.score;
          rank = rows;
        }
        x.push({
          id: row.id,
          candidate: row.candidate,
          rank: rank,
        });

        y.push(rank);
      });

      // const uarr = [...new Set(y)];
      // const duplicate = y.filter((value, index, self) => self.indexOf(value) !== index);
      const arr = y.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      let index = 0;
      let average = 0;

      for (const key in arr) {
        if (arr[key] > 1) {
          index = key - 1;
          let tot = 0;
          for (let j = 0; j < arr[key]; j++) {
            index++;
            tot += index;
          }
          average = tot / arr[key];
          index = key - 1;
          for (let j = 0; j < arr[key]; j++) {
            x[index].rank = average;
            index++;
          }
        }
      }

      x.forEach((row) => {
        const updateQuery = `UPDATE ${table} SET rank = ? WHERE id = ?`;
        const updateParams = [row.rank, row.id];
        db.query(updateQuery, updateParams);

        const scoreQuery = `
            SELECT
              t1.id,
              MAX(
                  CASE WHEN judge =(
                  SELECT
                      id
                  FROM
                      user
                  WHERE
                      judge_no = "judge1"
              ) THEN rank
              END
          ) AS judge1,
          MAX(
              CASE WHEN judge =(
              SELECT
                  id
              FROM
                  user
              WHERE
                  judge_no = "judge2"
          ) THEN rank
          END
          ) AS judge2,
          MAX(
              CASE WHEN judge =(
              SELECT
                  id
              FROM
                  user
              WHERE
                  judge_no = "judge3"
          ) THEN rank
          END
          ) AS judge3,
          MAX(
              CASE WHEN judge =(
              SELECT
                  id
              FROM
                  user
              WHERE
                  judge_no = "judge4"
          ) THEN rank
          END
          ) AS judge4,
          MAX(
              CASE WHEN judge =(
              SELECT
                  id
              FROM
                  user
              WHERE
                  judge_no = "judge5"
          ) THEN rank
          END
          ) AS judge5,
          SUM(t2.rank) AS total_score
          FROM
              candidate t1
          LEFT JOIN ${table} t2 ON
              t1.id = t2.candidate AND t2.judge != 0
          GROUP BY
              t1.id
          ORDER BY
              t1.id   `;

        db.query(scoreQuery, (err, result) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          result.forEach(async (row) => {
            // Query to check if the record exists for the given judgeId and candidateId
            const countQuery = `SELECT COUNT(*) AS numRows FROM ${table} WHERE judge = ? AND candidate = ?`;
            // // Use a Promise to handle the database query asynchronously
            const numRows = new Promise((resolve, reject) => {
              db.query(countQuery, [0, row.id], function (err, results) {
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
              const updateParams = [row.total_score, 0, row.id];
              await db.query(updateQuery, updateParams);
            } else {
              // Insert a new record with the judgeId, candidateId, and score
              const insertQuery = `INSERT INTO ${table} (judge, candidate, score) VALUES (?, ?, ?)`;
              const insertParams = [0, row.id, row.total_score];
              await db.query(insertQuery, insertParams);
            }
          });
        });
      });
    });

    // res.status(200).json({ message: "Score saved successfully!" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/rank", async (req, res, next) => {
  try {
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;