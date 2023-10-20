const express = require("express");
const {
  createUnit,
  updateUnit,
  deleteUnit,
} = require("../../services/admin/units.service");
const {
  validatePostUnit,
  validateUpdateUnit,
  validateDeleteUnit,
} = require("../../utils/validation/units.validation");
const router = express.Router();

router.post("/create_unit", (req, res) => {
  const { error } = validatePostUnit(req.body);

  if (error) return res.status(400).send(error.details);

  createUnit(req, (result) => {
    res.status(result.data.code).send(result.data);
  });
});

router.patch("/update_unit", (req, res) => {
  const { error } = validateUpdateUnit(req.body);

  if (error) return res.status(400).send(error.details);

  updateUnit(req, (result) => {
    res.status(result.data.code).send(result.data);
  });
});

router.delete("/delete_unit/:id", (req, res) => {
  const { error } = validateDeleteUnit(req.body);

  if (error) return res.status(400).send(error.details);

  deleteUnit(req, (result) => {
    res.status(result.data.code).send(result.data);
  });
});

module.exports = router;
