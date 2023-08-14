import express from "express";
import db from "./../db.js";
const router = express.Router();
const table = "settings";

router.get("/", async (req, res, next) => {
  const q =
    "SELECT * FROM `" + table + "` ORDER BY id ASC";
  db.query(q, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


// tabulaltor will close once the score is submitted
router.post("/toggleHide", async (req, res, next) => {
  try {
    const { id, hide } = req.body;
    const updateQuery = `UPDATE ${table} SET hide = ? WHERE id = ?`;
    const updateParams = [hide, id];
    db.query(updateQuery, updateParams);

    res.status(200).json({ message: "Event Hide!" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// toggleHide
export default router;
