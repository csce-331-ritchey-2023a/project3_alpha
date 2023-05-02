require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const connectDB = require("./connect");
const cors = require("cors");
const path = require('path')

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

const foodTables = ["toppings", "cheeses", "drizzles", "sauces", "toppings","zreport"]

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

app.get("/transactions/:startDate/:endDate", async (req, res) => {
  const startDate = req.params.startDate.replaceAll("-", "/");
  const endDate = req.params.endDate.replaceAll("-", "/");

  try {
    const item = await pool.query(
      `SELECT * FROM transactions WHERE transactiontime >= $1 AND transactiontime <= $2`,
      [startDate, endDate]
    );
    res.json(item.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/transaction", async (req, res) => { //Submits a customer's order into the database, decrementing each item chosen from the inventory by one
  let price = req.query.pizzatype == "cheese" ? 6.45 :
              req.query.pizzatype == "1-topping" ? 7.49 : 8.85

  try {
    let stmt = `INSERT INTO transactions (transactiontime, sauce, cheeses, drizzle, price, topping1, topping2, topping3, topping4)
    VALUES ('NOW()', '${req.query.sauce}', '${req.query.cheese}', '${req.query.drizzle}', '${price}', '${req.query.topping1}', '${req.query.topping2}', '${req.query.topping3}', '${req.query.topping4}');`
    let cheese_stmt = `UPDATE cheeses SET amount = amount - 1 WHERE cheeseid = '${req.query.cheese}';`
    let sauce_stmt = `UPDATE sauces SET amount = amount - 1 WHERE sauceid = '${req.query.sauce}';`
    let drizzle_stmt = `UPDATE drizzles SET amount = amount - 1 WHERE drizzleid = '${req.query.drizzle}';`
    let topping1_stmt = `UPDATE toppings SET amount = amount - 1 WHERE topping_id = '${req.query.topping1}';`
    let topping2_stmt = `UPDATE toppings SET amount = amount - 1 WHERE topping_id = '${req.query.topping2}';`
    let topping3_stmt = `UPDATE toppings SET amount = amount - 1 WHERE topping_id = '${req.query.topping3}';`
    let topping4_stmt = `UPDATE toppings SET amount = amount - 1 WHERE topping_id = '${req.query.topping4}';`
    await pool.query(stmt)
    await pool.query(cheese_stmt)
    await pool.query(sauce_stmt)
    await pool.query(drizzle_stmt)
    await pool.query(topping1_stmt)
    await pool.query(topping2_stmt)
    await pool.query(topping3_stmt)
    await pool.query(topping4_stmt)
    console.log('successfully added!')
  }
  catch (err) {
    console.error(err.message)
  }
})
//  //APP PUT
// app.put("/cheeses", async (req, res) => {
//   try {
//     console.log(req.query)
//     // console.log(req.query)
//     let stmt = conn.prepareStatement("UPDATE cheeses SET amount = amount - 1 WHERE cheeseid = ?");

//     // console.log(stmt)
//     await pool.query(stmt)
    
//     // console.log('successfully added!')
//   }
//   catch (err) {
//     console.error(err.message)
//   }
// })

//TODO: app.put can be decremented in inventory

app.get('/a/b/c/d/zreport', async (req,res) => {
  try{
    const stmt = `SELECT * FROM zreport`;
    const item = await pool.query(stmt);

    // console.log(item.rows)
    res.json(item.rows);

  } catch(err){
    console.error(err.message)
  }
})



app.get('/a/b/c/d/zreport/insert', async (req,res) => {
  try{
    const checkQuery = `SELECT COUNT(*) FROM zreport`;
    const queryRes = await pool.query(checkQuery);
    if (parseInt(queryRes.rows[0].count) == 0){ // if no records in z report table
      const s = `SELECT SUM(PRICE) FROM transactions`;
      const q = await pool.query(s);
      const sum = q.rows[0].sum;

      const currentTime = Date.now()

      const stmt = `INSERT INTO zreport (reportDate, totals) VALUES((to_timestamp(${currentTime} / 1000.0)), ${sum})`;
      const item = await pool.query(stmt);
      res.json(item.rows);
      
    } else {
      let stmt = `SELECT * from zreport order by reportdate desc limit 1;`;
      let item = await pool.query(stmt);

      let lastReport = new Date(Date.parse(item.rows[0].reportdate.toString()))
      let currentTime = new Date(Date.now())

      // Check if they're the same date
      if (lastReport.getFullYear() === currentTime.getFullYear() &&
          lastReport.getMonth() === currentTime.getMonth() &&
          lastReport.getDate() === currentTime.getDate()) {

          await pool.query(`DELETE from zreport WHERE reportid=${item.rows[0].reportid}`)
      }

      item = await pool.query(`SELECT MAX(reportDate) FROM zreport`)
      currentTime = Date.now()
      lastReport = Date.parse(item.rows[0].max.toString())

      let stmt2 = `SELECT SUM(price) FROM transactions WHERE transactiontime BETWEEN (to_timestamp(${lastReport} / 1000.0)) AND (to_timestamp(${currentTime} / 1000.0))`;

      const item2 = await pool.query(stmt2);

      let sum = item2.rows[0].sum;

      if (sum == null){
        sum = "0.00"
      }

      const stmt3 = `INSERT INTO zreport (reportDate, totals) VALUES((to_timestamp(${currentTime} / 1000.0)), ${sum})`;
      const item3 = await pool.query(stmt3);

      res.json(item3.rows);
    }

  } catch(err){
    console.error("line 160", err.message)
  }
});

app.get('/a/b/c/d/xreport/insert', async (req,res) => {

  try {
    const checkQuery = `SELECT COUNT(*) FROM xreport`;
    const queryRes = await pool.query(checkQuery);

    if (parseInt(queryRes.rows[0].count) == 0){// if no xreports
      console.log("there are no xreports")

      const s = `SELECT SUM(PRICE) FROM transactions`;
      const q = await pool.query(s);
      const sum = q.rows[0].sum;

      const currentTime = Date.now()

      const stmt = `INSERT INTO xreport (lastreport) VALUES((to_timestamp(${currentTime} / 1000.0)))`;
      await pool.query(stmt);
      res.json(q.rows[0])

    } else {
      console.log("there are xreports")

      const stmt = `SELECT MAX(lastreport) FROM xreport`;
      const item = await pool.query(stmt);

      const lastReport = Date.parse(item.rows[0].max.toString())
      const currentTime = Date.now()

      const stmt2 = `SELECT SUM(price) FROM transactions WHERE transactiontime BETWEEN (to_timestamp(${lastReport} / 1000.0)) AND (to_timestamp(${currentTime} / 1000.0))`;
      let item2 = await pool.query(stmt2);

      let sum = item2.rows[0].sum;
      if (sum == null){
        sum = "0.00"
        item2.rows[0].sum = sum;
      }

      const stmt3 = `INSERT INTO xreport (lastreport) VALUES((to_timestamp(${currentTime} / 1000.0)))`;
      await pool.query(stmt3);

      res.json(item2.rows[0])


    }
    
  } catch (err) {
    console.error(err.message)
  }

});

app.get('/update/:type/:name/:price/:amount', async (req, res) => {
  const type = req.params.type
  const name = req.params.name
  const amount = req.params.amount
  const price = req.params.price

  if (type == "cheeses") {
    let  query = `UPDATE ${type} set amount=${amount}, customerprice=${price} where cheeseid='${name}';`
    // console.log(query)
    pool.query(query)
  }

  if (req.params.type == "drizzles") {
    pool.query(`
      update ${type} set amount=${amount}, customerprice=${price} where drizzleid='${name}';
    `)
  }

  if (req.params.type == "toppings") {
    pool.query(`
      update ${type} set amount=${amount}, customer_price=${price} where topping_id='${name}';
    `)
  }

  if (req.params.type == "sauces") {
    pool.query(`
      update ${type} set amount=${amount}, customerprice=${price} where sauceid='${name}';
    `)
  }
})

app.get('/insert/:type/:name/:price/:amount', async (req, res) => {
  const type = req.params.type
  const name = req.params.name
  const amount = req.params.amount
  const price = req.params.price

  if (type == "cheeses") {
    pool.query(`
      insert into ${type} (cheeseid, amount, customerprice) VALUES('${name}', ${amount}, ${price});
    `)
  }

  if (req.params.type == "drizzles") {
    pool.query(`
      insert into ${type} (drizzleid, amount, customerprice) VALUES('${name}', ${amount}, ${price});
    `)
  }

  if (req.params.type == "toppings") {
    pool.query(`
      insert into ${type} (topping_id, amount, customer_price) VALUES('${name}', ${amount}, ${price});
    `)
  }

  if (req.params.type == "sauces") {
    pool.query(`
      insert into ${type} (sauceid, amount, customerprice) VALUES('${name}', ${amount}, ${price});
    `)
  }
})


if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
      res.send('Api running')
  })
}

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));




