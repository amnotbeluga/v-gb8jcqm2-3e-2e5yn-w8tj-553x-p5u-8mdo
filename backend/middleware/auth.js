const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.json({ message: "No token provided" });

  jwt.verify(token, "SECRET123", (err, decoded) => {
    if (err) return res.json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};
