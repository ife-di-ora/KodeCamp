function verifyToken(req, res, next) {
  const [scheme, token] = req.header.authorization.split(" ");
  if (scheme.toLocaleLowerCase() == "bearer") {
    try {
      const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send({ message: "Invalid token" });
    }
  }
}

module.exports = verifyToken;
