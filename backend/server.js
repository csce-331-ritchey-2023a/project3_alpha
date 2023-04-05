require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const connectDB = require("./connect");
const cors = require("cors");

const app = express(); // start express app

const PORT = process.env.PORT || 5000;

connectDB(); // test db connection

const pool = new Pool({ // make queries using pool
    user: 'csce315331_bui',
    host: 'csce-315-db.engr.tamu.edu',
    database: 'csce315331_alpha',
    password: '830004551',
    port: 5432,
  });

// middle ware
app.use(cors());
app.use(express.json());

const foodTables = ["toppings", "cheeses", "drizzles", "sauces", "toppings"]

app.get("/:table/", async (req, res) => { // sample query to get all toppings
  table = req.params.table
  try {
    if (foodTables.includes(table)) {
      const item = await pool.query(`SELECT * FROM ${table}`);
      res.json(item.rows);
    }
    else if(table == "transactions") {
      const item = await pool.query(`SELECT * FROM ${table}`);
      res.json(item.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/transaction", async (req, res) => {
  let price = req.query.pizzatype == "cheese" ? 6.45 :
              req.query.pizzatype == "1-topping" ? 7.49 : 8.85

  try {
    console.log(req.query)
    let stmt = `INSERT INTO transactions (transactiontime, sauce, cheeses, drizzle, price, topping1, topping2, topping3, topping4)
    VALUES ('NOW()', '${req.query.sauce}', '${req.query.cheese}', '${req.query.drizzle}', '${price}', '${req.query.topping1}', '${req.query.topping2}', '${req.query.topping3}', '${req.query.topping4}');`

    console.log(stmt)
    await pool.query(stmt)
    
    console.log('successfully added!')
  }
  catch (err) {
    console.error(err.message)
  }
})
/*
app.get("/toppings", async (req, res) => { // sample query to get all toppings
  try {
    const toppings = await pool.query("SELECT * FROM toppings");
    res.json(toppings.rows);
  } catch (err) {
    console.error(err.message);
  }
});
*/
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));




