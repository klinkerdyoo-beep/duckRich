import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// test api
app.get("/wallets", async (req, res) => {
  const result = await pool.query("SELECT * FROM wallets");
  res.json(result.rows);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
