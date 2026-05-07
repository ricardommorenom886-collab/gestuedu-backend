const mysql = require("mysql2/promise");
require("dotenv").config({ path: "src/.env" });

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "gestuedu",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = {
  query(sql, params, callback) {
    if (typeof params === "function") {
      callback = params;
      params = [];
    }

    if (callback) {
      pool.query(sql, params)
        .then(([rows]) => callback(null, rows))
        .catch((err) => callback(err));
      return;
    }

    return pool.query(sql, params);
  }
};

module.exports = db;
