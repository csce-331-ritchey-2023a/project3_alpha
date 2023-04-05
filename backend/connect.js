const { Pool } = require("pg");

const connectDB = async () => {
    try {
      const pool = new Pool({
        user: 'csce315331_bui',
        host: 'csce-315-db.engr.tamu.edu',
        database: 'csce315331_alpha',
        password: '830004551',
        port: 5432,
      });
      await pool.connect();
      //const res = await pool.query("SELECT * FROM toppings");
  
      console.log("Successfully connected to db");
      await pool.end();
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = connectDB;