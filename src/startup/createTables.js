const winston = require("winston");
const CREATE_TABLE = require("../utils/query/create_table.query");

const { pool: connect } = require("./database");

module.exports = function createTables() {
   const pool = connect();
  try {
    pool.query(CREATE_TABLE.UNITS, function (err, results) {
      if (err) {
        winston.error(
          "table creation error : ADMIN_QUERY.CREATE_TABLE_ADMINS",
          err
        );
        return;
      }

      winston.info("table created");
    });
  } catch (error) {
  } finally {
     pool.end();
  }
};
