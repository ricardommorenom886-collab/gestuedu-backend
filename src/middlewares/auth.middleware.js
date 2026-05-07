const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // 🔑 obtener header
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ error: "Token requerido" });
    }

    // 🔎 validar formato: "Bearer TOKEN"
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Formato inválido (Bearer TOKEN)" });
    }

    const token = parts[1];

    // 🔐 verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secreto"
    );

    // 📦 guardar usuario en request
    req.user = decoded;

    next();

  } catch (err) {
    console.error("Auth error:", err.message);

    return res.status(403).json({
      error: "Token inválido o expirado"
    });
  }
};

module.exports = verifyToken;