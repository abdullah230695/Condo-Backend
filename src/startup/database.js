const mysql = require("mysql2");

module.exports.connect = () => {
  return mysql.createConnection(process.env.DATABASE_URL);
};
