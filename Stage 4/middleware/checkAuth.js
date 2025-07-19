function verifyToken(req, res, next) {
  const [scheme, token] = req.header.authorization.split(" ");
  if (scheme.toLocaleLowerCase() == "bearer") {
    try {
      const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
      req.user = decoded; // attaches { userId, email, role } to req
      next();
    } catch (err) {
      res.status(401).send({ message: "Invalid token" });
    }
  }
}

module.export = verifyToken;
