const winston = require("winston");
const adminMiddleware = require("../../middlewares/admin_auth");
const {  connect } = require("../../startup/database");
const ADMIN_QUERY = require("../../utils/query/admin.query");

const createUnit = (req, callback) => {
  const {
    unit,
    floor,
    block,
    sqft_details,
    flat_type,
    water_code,
    eb_code,
    unit_doc_attachment,
    parking_slot_count,
    parking_alloc_nos,
  } = req.body;

  const values = {
    unit,
    block,
    floor,
    sqft_details,
    flat_type,
    water_code,
    eb_code,
    unit_doc_attachment,
    parking_slot_count,
    parking_alloc_nos: JSON.stringify(parking_alloc_nos),
  };

  const pool = connect();

  try {
    pool.query(ADMIN_QUERY.INSERT_UNIT, values, (err, results) => {
      if (err) {
        winston.error("error : ", err);
        callback("error");
        return;
      }
      winston.info("unit created : ", results);
      
      callback(results);
    });
  } catch (error) {
    
  } finally {
    pool.end();
  }
};

module.exports = { createUnit };
