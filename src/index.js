const express = require("express");
const winston = require("winston");
const app = express();

require("./startup/config")();
require("./startup/logger")();
// require("./startup/createTables")();
require("./startup/apiRoutes")(app);

const port = process.env.PORT || 3000;

winston.info("Running Environment : ", process.env.NODE_ENV);

const server = app.listen(port, () => {
  winston.info(`Server started on port ${port}`);
});

module.exports = server;
