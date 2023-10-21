const express = require("express");
const router = express.Router();

const Admin_Controller = require("./admin/admins.controller");
const Admin_UnitsController = require("./admin/units.controller");

router.use("/admin", Admin_Controller);
router.use("/unit", Admin_UnitsController);

module.exports = router;
