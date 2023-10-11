import express from "express";
import db from "./../db.js";
const router = express.Router(); 
router.get("/", async (req, res, next) => {
  const awardName = req.query.award;
  const userquery = `SELECT * FROM user where role_type = 'judge' order by id asc`;
  

  try {
    const users = await queryPromise(userquery);
    const x = {};
    await Promise.all(
      users.map(async (row) => {
        const judgeid = row.id;
        const q = `SELECT * FROM ${awardName}  
          WHERE ${awardName}.judge = ${judgeid}
          ORDER BY ${awardName}.judge, ${awardName}.candidate ASC`;

        const results = await queryPromise(q);

        // Assuming there are multiple rows in the results array
        x[row.judge_no] = results.map((result) => ({
          id: result.id,
          candidate: result.candidate,
          judge: row.judge_no,
          score: result.score,
          rank: result.rank,
        }));
      })

    ); 
    // console.log(x)
    res.json(x)
    // You can send the x array as a response to the client or perform further actions here.
  } catch (err) {
    console.error(err);
    // Handle any errors that occur during database queries
  }
});


function queryPromise(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}



router.delete("/", async (req, res, next) => {
  try {
    const { id, link } = req.query;
    // Perform the delete operation
    const q = `DELETE FROM ${link} WHERE id = ?`;
    db.query(q, [id], (err, result) => {
      if (err) {
        console.error("Error deleting data:", err);
        res.status(500).json({ error: "Error deleting data" });
        return;
      }

      res.status(200).json({ message: "Data deleted successfully" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error deleting data" });
  }
});

export default router;
