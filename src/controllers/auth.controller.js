const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// REGISTER
// ======================
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol, dni } = req.body;

    // 1. verificar si existe
    const [user] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (user.length > 0) {
      return res.status(400).json({
        message: "El email ya está registrado"
      });
    }

    // 2. encriptar password
    const hash = await bcrypt.hash(password, 10);

    // 3. insertar usuario
    await db.query(
      "INSERT INTO usuarios (nombre, email, password, rol, dni) VALUES (?, ?, ?, ?, ?)",
      [nombre, email, hash, rol || "usuario", dni || null]
    );

    res.json({ message: "Usuario registrado correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en registro" });
  }
};

// ======================
// LOGIN
// ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscar usuario
    const [results] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario no existe" });
    }

    const user = results[0];

    // comparar contraseña
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // generar token
    const token = jwt.sign(
      { id: user.id, rol: user.rol, dni: user.dni },
      "secreto",
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en login" });
  }
};
