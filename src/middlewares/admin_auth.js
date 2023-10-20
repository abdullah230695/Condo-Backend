const admin_auth = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Invalid authentication, No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    if (!req.user.isAdmin) return res.status(403).send("Access denied");
    next();
  } catch (error) {
    res.status(400).send("Invalid token provided");
  }
};

module.exports = admin_auth;
