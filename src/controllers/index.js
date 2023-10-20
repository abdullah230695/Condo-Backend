const express = require("express");
const router = express.Router();

const Admin_UnitsController = require("./admin/units.controller");

router.use("/admin/units", Admin_UnitsController);

module.exports = router;
