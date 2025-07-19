const jsonwebtoken = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const [scheme, token] = req.headers.authorization.split(" ");

  if (scheme.toLocaleLowerCase() == "bearer") {
    try {
      const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
      console.log(decoded);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send({ message: "Invalid token" });
    }
  }
}

module.exports = verifyToken;
