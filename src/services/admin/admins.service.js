const lodash = require("lodash");
const bcrypt = require("bcrypt");
const winston = require("winston");
const adminMiddleware = require("../../middlewares/admin_auth");
const { connect } = require("../../utils/database");
const QUERY = require("../../utils/query/admin.query");
const { constants, status_code } = require("../../common/constants");
const {
  resSuccess,
  resFailure,
  generateToken,
} = require("../../common/global_functions");

const loginAdmin = async (req, callback) => {
  const { username, password } = req.body;
  const pool = connect();

  try {
    pool.query(QUERY.ADMIN.SELECT_ONE, username, async (err, results) => {
      if (err) {
        winston.error("loginAdmin : ", err);
        const msg = resFailure(
          status_code.Server_Errors.Internal_Server_Error,
          constants.ERROR_MSG
        );
        callback(msg);
        return;
      }

      if (results.length > 0) {
        const user = results[0];

        const isMatched = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (!isMatched) {
          const msg = resFailure(
            status_code.Client_Errors.Bad_Request,
            constants.INCORRECT_USERNAME_OR_PASSWORD
          );

          return callback(msg);
        }

        user.token = generateToken(
          lodash.pick(user, ["id", "username", "role", "status"])
        );
        
        const msg = resSuccess(
          status_code.Success.OK,
          constants.TYPE_JSON,
          lodash.omit(user, ["password"])
        );
        return callback(msg);
      } else {
        const msg = resFailure(
          status_code.Client_Errors.Not_Found,
          constants.USERNAME_NOT_REGISTERED
        );

        callback(msg);
      }
    });
  } catch (error) {
    winston.error("loginAdmin : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback(msg);
  } finally {
    pool.end();
  }
};

const viewAllAdmins = (req, callback) => {
  const pool = connect();

  try {
    pool.query(QUERY.ADMIN.SELECT_ALL, (err, results) => {
      if (err) {
        winston.error("viewAllAdmins : ", err);
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
    winston.error("viewAllAdmins : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback(msg);
  } finally {
    pool.end();
  }
};

const createAdmin = async (req, callback) => {
  let { username, password } = req.body;
  const pool = connect();
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const values = {
      username,
      password,
      role: constants.ROLE_ADMIN,
    };

    pool.query(QUERY.ADMIN.INSERT, values, (err, results) => {
      if (err) {
        winston.error("createAdmin : ", err.code);
        const msg = resFailure(
          err.code === "ER_DUP_ENTRY"
            ? status_code.Client_Errors.Bad_Request
            : status_code.Server_Errors.Internal_Server_Error,
          err.code === "ER_DUP_ENTRY" ? "Duplicate entry" : constants.ERROR_MSG
        );
        callback(msg);
        return;
      }

      const msg = resSuccess(
        status_code.Success.Created,
        constants.TYPE_STRING,
        "admin created"
      );

      callback(msg);
    });
  } catch (error) {
    winston.error("createAdmin : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback(msg);
  } finally {
    pool.end();
  }
};

const updateAdmin = (req, callback) => {
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
        winston.error("updateAdmin : ", err);
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
              "admin updated"
            )
          : resFailure(
              status_code.Client_Errors.Not_Found,
              constants.NOT_EXIST_MSG
            );

      callback(msg);
    });
  } catch (error) {
    winston.error("updateAdmin : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback(msg);
  } finally {
    pool.end();
  }
};

const deleteAdmin = (req, callback) => {
  const pool = connect();

  try {
    pool.query(QUERY.UNIT.DELETE, req.query.id, (err, results) => {
      if (err) {
        winston.error("deleteAdmin : ", err);
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
              "admin deleted"
            )
          : resFailure(
              status_code.Client_Errors.Not_Found,
              constants.NOT_EXIST_MSG
            );

      callback(msg);
    });
  } catch (error) {
    winston.error("deleteUnit : ", error);
    const msg = resFailure(
      status_code.Server_Errors.Internal_Server_Error,
      constants.ERROR_MSG
    );
    callback(msg);
  } finally {
    pool.end();
  }
};

module.exports = {
  viewAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
};
