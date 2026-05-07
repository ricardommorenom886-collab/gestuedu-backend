const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "gestuedu",
  port: 3306
});

async function test() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("CONEXIÓN OK:", rows);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();