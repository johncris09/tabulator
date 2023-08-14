import express from "express";
import db from "./../db.js";
const router = express.Router();
const table = "production_number";

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
        pa.score as pa_score,
        pa.rank as pa_rank,
        pa.status as pa_status,
        pn.score as pn_score,
        pn.rank as pn_rank,
        pn.status as pn_status,
        tf.score as tf_score,
        tf.rank as tf_rank
    FROM
        candidate c
    LEFT JOIN production_attire pa ON
        pa.candidate = c.id AND pa.judge = ?
    LEFT JOIN ${table} pn ON
        pn.candidate = c.id AND pn.judge = ?
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

router.get("/final_result", async (req, res, next) => {
  try {
    const q = `
      SELECT
          candidate.id,
          candidate.number,
          candidate.name,
          production_number.rank
      FROM
          candidate
      JOIN production_number ON production_number.candidate = candidate.id
      WHERE
          judge = 0 AND score != 0
      group by candidate.id
      ORDER BY
          rank ASC;`;

    db.query(q, (err, result) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const maxRank = 1;
      let rank = 0;
      const ranks = {};
      const processedResult = [];

      for (const row of result) {
        const { id, rank: candidateRank, number, name } = row;

        ranks[candidateRank] ??= ++rank;

        if (ranks[candidateRank] > maxRank) {
          break;
        }

        processedResult.push({
          candidateId: id,
          number: number,
          name: name,
          rank: rank,
        });
      }

      res.json(processedResult);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/isAllJudgeDoneScoring", async (req, res, next) => {
  try {
    // return true
    const query = `
      SELECT
              COUNT(count_status) AS total_count
          FROM
              (
              SELECT
                  judge,
                  COUNT(
              STATUS
              ) AS count_status
          FROM 
              ${table} 
          WHERE
              judge IN(
              SELECT
                  id
              FROM
                  user
              WHERE
                  role_type = "judge"
          ) AND
          STATUS
              = "locked"
          GROUP BY
              judge
          ) AS subquery; `;

    db.query(query, (err, result) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Initialize the fl
      let hasUnlockedStatus = false;
      const total_count = result[0]["total_count"];
 
      if (total_count === 5) {
        hasUnlockedStatus = true; // Set the flag if an unlocked status is found
      }

      res.send(hasUnlockedStatus);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getAllJudgeScores", async (req, res, next) => {
  try {
    // return true
    const query = `
        SELECT * FROM ${table},  candidate
        where judge != 0 
        and candidate.id = production_number.candidate
        order by judge, candidate asc;`;

    db.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      const judgeScores = {};
      result.forEach((row) => {
        if (!judgeScores[row.judge]) {
          judgeScores[row.judge] = { judgeId: row.judge, scores: [] };
        }
        judgeScores[row.judge].scores.push({
          candidateInfo: { number: row.number },
          score: row.score,
          rank: row.rank,
        });
      });

      res.json(Object.values(judgeScores));
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
        SUM(
            CASE
                WHEN pn.judge = 0 THEN pn.score
                ELSE 0
            END
        ) AS total_score,
        MAX(
            CASE
                WHEN pn.judge = 0 THEN pn.rank
                else 0
            END
        ) AS final_rank,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge1')  THEN pn.status
            END
        ) AS judge1_status,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge2')  THEN pn.status
            END
        ) AS judge2_status,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge3')  THEN pn.status
            END
        ) AS judge3_status,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge4')  THEN pn.status
            END
        ) AS judge4_status,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge5')  THEN pn.status
            END
        ) AS judge5_status,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge1')  THEN pn.judge
            END
        ) AS judge1_id,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge2')  THEN pn.judge
            END
        ) AS judge2_id,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge3')  THEN pn.judge
            END
        ) AS judge3_id,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge4')  THEN pn.judge
            END
        ) AS judge4_id,
        MAX(
          CASE
                WHEN pn.judge  =  (select id from user where judge_no = 'judge5')  THEN pn.judge
            END
        ) AS judge5_id
      FROM
          ${table} pn
          JOIN candidate c ON pn.candidate = c.id
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
      const inserpnarams = [judgeId, candidateId, score];
      await db.query(insertQuery, inserpnarams);
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
              const inserpnarams = [0, row.id, row.total_score];
              await db.query(insertQuery, inserpnarams);
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
router.post("/lockScore", async (req, res, next) => {
  try {
    const { judgeId, status } = req.body;

    const updateQuery = `UPDATE ${table} SET status = ? WHERE judge = ?`;
    const updateParams = [status, judgeId];
    db.query(updateQuery, updateParams);

    res.status(200).json({ message: "Score Submitted!" });
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
