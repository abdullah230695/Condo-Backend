require("express-async-errors");
const winston = require("winston");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "unhandledExceptions.log" })
  );

  //catch errors outside of express
  process.on("unhandledRejection", (exception) => {
    winston.error(exception);
    throw exception;
  });

  winston.add(winston.transports.File, {
    filename: "logfile.log",
    level: "info",
  });
};
