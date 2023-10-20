const winston = require("winston");
const adminMiddleware = require("../../middlewares/admin_auth");
const { connect } = require("../../startup/database");
const ADMIN_QUERY = require("../../utils/query/admin.query");
const { constants } = require("../../common/constants.common");
const {
  resSuccess,
  resFailure,
} = require("../../common/global_functions.common");

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
        const msg = resFailure(400, constants.ERROR_MSG);
        callback({ status: false, data: msg });
        return;
      }
      winston.info("unit created : ", results);

      const msg = resSuccess(200, "unit created");

      callback({ status: true, data: msg });
    });
  } catch (error) {
  } finally {
    pool.end();
  }
};

module.exports = { createUnit };
