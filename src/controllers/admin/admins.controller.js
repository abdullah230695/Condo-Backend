const lodash = require("lodash");
const express = require("express");

const {
  viewAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
} = require("../../services/admin/admins.service");

const {
  validateCreateAdmin,
  validateUpdateAdmin,
  validateLogin,
} = require("../../utils/validators/admins.validator");

const { status_code } = require("../../common/constants");
const { resFailure } = require("../../common/global_functions");

const router = express.Router();

// Admin login
router.post("/login", (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      error.details
    );

    return res.status(msg.code).send(msg);
  }

  loginAdmin(req, (result) => {
    if (result.status === "success")
      res.header("Authorization", result.result.token);
    res
      .status(result.code)
      .send(
        result.status === "success"
          ? lodash.omit(result, ["result.token"])
          : result
      );
  });
});

// Get unit details by id
router.get("/all_admins", (req, res) => {
  if (!req.query.id) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      "id is required"
    );
    return res.status(msg.code).send(msg);
  }

  viewAllAdmins(req, (result) => {
    res.status(result.code).send(result);
  });
});

// create an unit
router.post("/create_admin", (req, res) => {
  const { error } = validateCreateAdmin(req.body);

  if (error) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      error.details
    );
    return res.status(msg.code).send(msg);
  }

  createAdmin(req, (result) => {
    res.status(result.code).send(result);
  });
});

// update an unit
router.patch("/update_admin", (req, res) => {
  const { error } = validateUpdateAdmin(req.body);

  if (error) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      error.details
    );
    return res.status(msg.code).send(msg);
  }

  updateAdmin(req, (result) => {
    res.status(result.code).send(result);
  });
});

// delete an unit by id
router.delete("/delete_admin", (req, res) => {
  if (!req.query.id) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      "id is required"
    );
    return res.status(msg.code).send(msg);
  }

  deleteAdmin(req, (result) => {
    res.status(result.code).send(result);
  });
});

module.exports = router;
