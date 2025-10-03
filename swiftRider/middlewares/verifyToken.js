const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const [type, token] = req.headers.authorization.split(" ");

  if (type.toLocaleLowerCase() !== "bearer") {
    res.status(401).send({ message: "invalid token type" });
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.user = decoded;
  next();
};

module.exports = verifyToken;
