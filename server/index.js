const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./db');
// const { polarAxisReducer } = require("recharts/types/state/polarAxisSlice");

app.use(cors());
app.use(express.json());


// Router
// category
// create
app.post("/transaction", async (req,res) => {
  try{
    const {date, type, category_id, note, amount,wallet_id} = req.body;

    const amt = Number(amount);
    await pool.query("BEGIN");

    const newRecord = await pool.query(
      `INSERT INTO transactions (date,type,category_id,note,amount,wallet_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`
      ,[date, type, category_id, note, amount,wallet_id]
    );

    const balanceQuery =
      type === "IN" ? `UPDATE wallets SET balance = balance + $1 WHERE id = $2`
       : `UPDATE wallets SET balance = balance - $1 WHERE id = $2`;

    await pool.query(balanceQuery, [amt, wallet_id]);
    await pool.query("COMMIT");

    res.json(newRecord.rows[0]);
  }catch(err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
})




app.post("/category", async (req,res) => {
    try{
        const {name, color, description,icon} = req.body;
        const newCategory = await pool.query(
            `INSERT INTO categories (name,color,description,icon) VALUES($1,$2,$3,$4) RETURNING *`,
            [name,color,description,icon]
        );
        res.json(newCategory.rows[0]);
    }catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

app.post("/themes", async (req, res) => {
  try{
    const { name, theme} = req.body;
    const newWallet = await pool.query(
      `INSERT INTO themes (name,primary_color,secondary_color,logo_color,accent_color) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [name,theme.primaryColor,theme.secondaryColor,theme.logoColor,theme.accentColor]
    );
    res.json(newWallet.rows[0]);
  }catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
})

app.post("/wallets", async (req, res) => {
  try {
    const { name, wallet_type, balance, theme_id } = req.body;

    const newWallet = await pool.query(
      `INSERT INTO wallets 
      (name, wallet_type, balance, theme_id) 
      VALUES ($1,$2,$3,$4)
      RETURNING *`,
      [name, wallet_type, balance, theme_id]
    );

    res.json(newWallet.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

//view
app.get("/category", async(req,res)=>{
    try{
        const allCategory = await pool.query("SELECT * FROM categories");
        res.json(allCategory.rows);
    }catch(err){
        console.error(err.message);
    }
})

app.get("/transaction", async(req,res) => {
  try{
    const allTransaction = await pool.query("SELECT * FROM transactions");
    res.json(allTransaction.rows);
  }catch(err){
    console.error(err.message);
  }
})

app.get("/transaction/:id", async(req,res) => {
  try{
    const {id} = req.params;
    const allTransaction = await pool.query("SELECT * FROM transactions WHERE id = $1", [id]);
    res.json(allTransaction.rows[0]);
  }catch(err){
    console.error(err.message);
  }
})

app.get("/category/:id", async(req,res) =>{
    try {
        // console.log(req.params);
        const { id } = req.params;
        const category = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
        // console.log(id); // '1'
        res.json(category.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
})

app.get("/wallet/:id", async(req,res) => {
  try{
    const {id} = req.params;
    const wallet = await pool.query(      
      `SELECT 
        w.id, w.name, w.wallet_type, w.balance, w.created_at,
        t.id AS theme_id, t.primary_color, t.secondary_color, t.accent_color,t.logo_color
      FROM wallets w
      JOIN themes t ON w.theme_id = t.id
      WHERE w.id = $1
      `, [id]);
    res.json(wallet.rows[0]);
  }catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
  }
})

app.get("/wallets", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        w.id,
        w.name,
        w.wallet_type,
        w.balance,
        t.primary_color,
        t.secondary_color,
        t.accent_color,
        t.logo_color
      FROM wallets w
      JOIN themes t ON w.theme_id = t.id
      ORDER BY w.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


//update
app.put("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, description, icon } = req.body;

    const updateCategory = await pool.query(
      `UPDATE categories
       SET
         name = COALESCE($1, name),
         color = COALESCE($2, color),
         description = COALESCE($3, description),
         icon = COALESCE($4, icon)
       WHERE id = $5
       RETURNING *`,
      [
        name || null,
        color || null,
        description || null,
        icon || null,
        id
      ]
    );

    res.json(updateCategory.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

app.put("/transaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, type, category_id, note, amount, wallet_id } = req.body;

    await pool.query("BEGIN");

    // ดึง record เดิม
    const oldTx = await pool.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id]
    );
    if (oldTx.rows.length === 0) {
      throw new Error("Transaction not found");
    }

    const old = oldTx.rows[0];

    // คืน balance เดิม
    const rollbackQuery =
      old.type === "IN"
        ? `UPDATE wallets SET balance = balance - $1 WHERE id = $2`
        : `UPDATE wallets SET balance = balance + $1 WHERE id = $2`;

    await pool.query(rollbackQuery, [old.amount, old.wallet_id]);

    // update transaction
    const updated = await pool.query(
      `UPDATE transactions
       SET date=$1, type=$2, category_id=$3, note=$4, amount=$5, wallet_id=$6
       WHERE id=$7
       RETURNING *`,
      [date, type, category_id, note, amount, wallet_id, id]
    );

    // apply new balance
    const applyQuery =
      type === "IN"
        ? `UPDATE wallets SET balance = balance + $1 WHERE id = $2`
        : `UPDATE wallets SET balance = balance - $1 WHERE id = $2`;

    await pool.query(applyQuery, [amount, wallet_id]);

    await pool.query("COMMIT");
    res.json(updated.rows[0]);

  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err.message);
    res.status(500).json("Server error");
  }
});



//delete
app.delete('/category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(5000, () => {
    console.log('server has started on port 5000');
});

