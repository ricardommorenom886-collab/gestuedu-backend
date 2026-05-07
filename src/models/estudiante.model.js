const db = require("../config/db");

// GET ALL
exports.getAll = async (userId) => {
  const [rows] = await db.query(
    `SELECT e.*, IFNULL(AVG(n.nota), 0) AS promedio
     FROM estudiantes e
     LEFT JOIN notas n ON e.id = n.estudiante_id
     GROUP BY e.id`,
    []
  );
  return rows;
};

// GET BY ID
exports.getById = async (id, userId) => {
  const [rows] = await db.query(
    `SELECT e.*, IFNULL(AVG(n.nota), 0) AS promedio
     FROM estudiantes e
     LEFT JOIN notas n ON e.id = n.estudiante_id
     WHERE e.id = ?
     GROUP BY e.id`,
    [id]
  );
  return rows[0];
};

// CREATE
exports.create = async (data) => {
  const { nombre, documento, correo, edad, usuario_id } = data;

  // 🔥 validación básica para evitar errores raros
  if (!nombre || !documento || !correo || !edad) {
    throw new Error("Faltan datos obligatorios");
  }

  const [result] = await db.query(
    "INSERT INTO estudiantes (nombre, documento, correo, edad, usuario_id) VALUES (?, ?, ?, ?, ?)",
    [nombre, documento, correo, edad, usuario_id || null]
  );

  return result;
};

// UPDATE
exports.update = async (id, data, userId) => {
  const { nombre, documento, correo, edad, usuario_id } = data;

  const [result] = await db.query(
    "UPDATE estudiantes SET nombre=?, documento=?, correo=?, edad=?, usuario_id=? WHERE id=?",
    [nombre, documento, correo, edad, usuario_id || null, id]
  );

  return result;
};

// DELETE
exports.remove = async (id) => {
  const [result] = await db.query(
    "DELETE FROM estudiantes WHERE id=?",
    [id]
  );

  return result;
};
