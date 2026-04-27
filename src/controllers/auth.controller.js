const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "clave_secreta"; // luego puedes usar .env

// =======================
// REGISTRO
// =======================
exports.register = (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = "INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)";

  db.query(sql, [nombre, correo, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al registrar" });
    }

    res.status(201).json({ message: "Usuario registrado" });
  });
};

// =======================
// LOGIN
// =======================
exports.login = (req, res) => {
  const { correo, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE correo = ?";

  db.query(sql, [correo], (err, results) => {
    if (err) return res.status(500).json({ error: "Error servidor" });

    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = results[0];

    const passwordValido = bcrypt.compareSync(password, user.password);

    if (!passwordValido) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login exitoso",
      token
    });
  });
};