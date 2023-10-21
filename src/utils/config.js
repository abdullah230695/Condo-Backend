//Setting the environment variables in nodejs
const dotenv = require("dotenv");
dotenv.config({ path: "./dev.env" });

module.exports = function () {
  const isDefined = process.env.JWT_PRIVATE_KEY;
  if (!isDefined) {
    throw Error("FATAL ERROR : JWT_PRIVATE_KEY is not configured");
  }
};
