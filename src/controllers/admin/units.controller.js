const express = require("express");
const authMiddleware = require("../../middlewares/admin_auth");
const {
  createUnit,
  updateUnit,
  deleteUnit,
  viewUnit,
} = require("../../services/admin/units.service");

const {
  validatePostUnit,
  validateUpdateUnit,
} = require("../../utils/validators/units.validator");

const { status_code } = require("../../common/constants");
const { resFailure } = require("../../common/global_functions");

const router = express.Router();

// Get unit details by id
router.get("/", authMiddleware, (req, res) => {
  if (!req.query.id) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      "id is required"
    );
    return res.status(msg.code).send(msg);
  }

  viewUnit(req, (result) => {
    res.status(result.code).send(result);
  });
});

// create an unit
router.post("/create_unit", (req, res) => {
  const { error } = validatePostUnit(req.body);

  if (error) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      error.details
    );
    return res.status(msg.code).send(msg);
  }

  createUnit(req, (result) => {
    res.status(result.code).send(result);
  });
});

// update an unit
router.patch("/update_unit", (req, res) => {
  const { error } = validateUpdateUnit(req.body);

  if (error) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      error.details
    );
    return res.status(msg.code).send(msg);
  }

  updateUnit(req, (result) => {
    res.status(result.code).send(result);
  });
});

// delete an unit by id
router.delete("/delete_unit", (req, res) => {
  if (!req.query.id) {
    const msg = resFailure(
      status_code.Client_Errors.Bad_Request,
      "id is required"
    );
    return res.status(msg.code).send(msg);
  }

  deleteUnit(req, (result) => {
    res.status(result.code).send(result);
  });
});

module.exports = router;
