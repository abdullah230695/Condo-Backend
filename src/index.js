const express = require("express");
const winston = require("winston");
const app = express();

require("./utils/config")();
require("./utils/logger")();
// require("./utils/createTables")();
require("./utils/apiRoutes")(app);

const port = process.env.PORT || 3000;

winston.info("Running Environment : ", process.env.NODE_ENV);

app.listen(port, () => {
  winston.info(`Server started on port ${port}`);
});
