import express from "express";
import db from "./../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const table = "deworming";

const router = express.Router();
// User login
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user by username
  const sql = "SELECT * FROM user WHERE username = ?";
  const updateSql = "UPDATE user SET is_logged_in = 1 WHERE username = ?";

  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Check if the user exists in the database
    const user = results[0];
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    try {
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if the user is already logged in
      if (user.is_logged_in === 1) {
        return res.status(401).json({ error: "Only one device per account is allowed" });
      }

      // Update is_logged_in to 1
      db.query(updateSql, [username], (updateErr) => {
        if (updateErr) {
          console.error("Error updating is_logged_in:", updateErr);
          return res.status(500).json({ error: "Internal server error" });
        }
      });

      // Remove the key from the user object
      delete user.password;

      // Generate and send a JSON Web Token (JWT)
      const token = jwt.sign({ ...user }, "secretKey");
      res.json({ token });
    } catch (error) {
      console.error("Error comparing passwords:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

export default router;
