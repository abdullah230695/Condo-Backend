const winston = require("winston");
const adminMiddleware = require("../../middlewares/admin_auth");
const { connect } = require("../../utils/database");
const QUERY = require("../../utils/query/admin.query");
const { constants, status_code } = require("../../common/constants");
const { resSuccess, resFailure } = require("../../common/global_functions");

const viewUnit = (req, callback) => {
  const pool = connect();

  try {
    pool.query(QUERY.UNIT.SELECT_ONE, req.query.id, (err, results) => {
      if (err) {
        winston.error("viewUnit : ", err);
        const msg = resFailure(
          status_code.Server_Errors.Internal_Server_Error,
          constants.ERROR_MSG
        );
        callback(msg);
        return;
      }
      
      const msg =
        results.length > 0
          ? resSuccess(status_code.Success.OK, constants.TYPE_JSON, results[0])
          : resFailure(
              status_code.Client_Errors.Not_Found,
              constants.NOT_EXIST_MSG
            );

      callback(msg);
    });
  } catch (error) {
    winston.error("viewUnit : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback( msg );
  } finally {
    pool.end();
  }
};

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
    pool.query(QUERY.UNIT.INSERT, values, (err, results) => {
      if (err) {
        winston.error("createUnit : ", err);
        const msg = resFailure(
          status_code.Server_Errors.Internal_Server_Error,
          constants.ERROR_MSG
        );
        callback(msg );
        return;
      }

      const msg = resSuccess(
        status_code.Success.Created,
        constants.TYPE_STRING,
        "unit created"
      );

      callback(msg );
    });
  } catch (error) {
    winston.error("createUnit : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback(msg );
  } finally {
    pool.end();
  }
};

const updateUnit = (req, callback) => {
  const { id, unit_doc_attachment, parking_slot_count, parking_alloc_nos } =
    req.body;

  const values = {
    unit_doc_attachment,
    parking_slot_count,
    parking_alloc_nos: JSON.stringify(parking_alloc_nos),
  };

  const pool = connect();

  try {
    pool.query(QUERY.UNIT.UPDATE, [values, id], (err, results) => {
      if (err) {
        winston.error("updateUnit : ", err);
        const msg = resFailure(
          status_code.Server_Errors.Internal_Server_Error,
          constants.ERROR_MSG
        );
        callback(msg);
        return;
      }

      const msg =
        results.affectedRows > 0
          ? resSuccess(
              status_code.Success.OK,
              constants.TYPE_STRING,
              "unit updated"
            )
          : resFailure(
              status_code.Client_Errors.Not_Found,
              constants.NOT_EXIST_MSG
            );

      callback(msg);
    });
  } catch (error) {
    winston.error("updateUnit : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback(msg);
  } finally {
    pool.end();
  }
};

const deleteUnit = (req, callback) => {
  const pool = connect();

  try {
    pool.query(QUERY.UNIT.DELETE, req.query.id, (err, results) => {
      if (err) {
        winston.error("deleteUnit : ", err);
        const msg = resFailure(
          status_code.Server_Errors.Internal_Server_Error,
          constants.ERROR_MSG
        );
        callback(msg);
        return;
      }

      const msg =
        results.affectedRows > 0
          ? resSuccess(
              status_code.Success.OK,
              constants.TYPE_STRING,
              "unit deleted"
            )
          : resFailure(
              status_code.Client_Errors.Not_Found,
              constants.NOT_EXIST_MSG
            );

      callback( msg );
    });
  } catch (error) {
    winston.error("deleteUnit : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback(msg );
  } finally {
    pool.end();
  }
};

module.exports = { viewUnit, createUnit, updateUnit, deleteUnit };
