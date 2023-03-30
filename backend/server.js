require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const connectDB = require("./connect");
const cors = require("cors");

const app = express(); // start express app

const PORT = process.env.PORT || 5000;

connectDB(); // test db connection

const pool = new Pool({ // make queries using pool
    user: 'csce315331_albright',
    host: 'csce-315-db.engr.tamu.edu',
    database: 'csce315331_alpha',
    password: '529008060',
    port: 5432,
  });

// middle ware
app.use(cors());
app.use(express.json());


app.get("/toppings", async (req, res) => { // sample query to get all toppings
    try {
      const toppings = await pool.query("SELECT * FROM toppings");
      res.json(toppings.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));




