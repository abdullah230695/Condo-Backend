const router = require("../controllers/index");
const express = require("express");

const error = require("../middlewares/error");

const initialPath = "/api";

module.exports = function (app) {
  app.use(express.json());

  app.use(initialPath, router);

  //to log error message in winston we can use this middleware,
  // otherwise express - async - errors will throw its default error(Internal server error)
  app.use(error);
};
