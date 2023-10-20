const express = require("express");
const { createUnit } = require("../../services/admin/units.service");
const { validatePostUnit } = require("../../utils/validation/units.validation");
const router = express.Router();

router.post("/create_unit", (req, res) => {
  const { error } = validatePostUnit(req.body);

  if (error) return res.status(400).send(error.details);

  createUnit(req, (result) => {
    res.status(result.data.code).send(result.data);
  });
});

// router.post("/update_unit", (req, res) => {
//   const { error } = validatePostUnit(req.body);

//   if (error) return res.status(400).send(error.details);

//   createUnit(req, (result) => {
//     res.status(200).send("inserted : " + result);
//   });
// });

module.exports = router;
