const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nombre, email, rol, dni FROM usuarios ORDER BY id"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, nombre, email, rol, dni FROM usuarios WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar usuario" });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol, dni } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, password, rol, dni) VALUES (?, ?, ?, ?, ?)",
      [nombre, email, hash, rol || "usuario", dni || null]
    );

    res.json({ message: "Usuario creado correctamente", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol, dni } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ error: "Nombre y email son obligatorios" });
    }

    let result;

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      [result] = await db.query(
        "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ?, dni = ? WHERE id = ?",
        [nombre, email, hash, rol || "usuario", dni || null, req.params.id]
      );
    } else {
      [result] = await db.query(
        "UPDATE usuarios SET nombre = ?, email = ?, rol = ?, dni = ? WHERE id = ?",
        [nombre, email, rol || "usuario", dni || null, req.params.id]
      );
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM usuarios WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
