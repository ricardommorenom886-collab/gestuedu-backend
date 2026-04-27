const jwt = require("jsonwebtoken");

const SECRET = "clave_secreta";

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token requerido" });
  }

  const tokenLimpio = token.split(" ")[1];

  jwt.verify(tokenLimpio, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.userId = decoded.id;
    next();
  });
};