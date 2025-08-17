const mysql = require("mysql2");

//2ways

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-amice",
  password: "1234qwer",
});

module.exports = pool.promise();
