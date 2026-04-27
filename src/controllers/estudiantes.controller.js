const db = require("../config/db");

// =======================
// CREAR ESTUDIANTE
// =======================
exports.createEstudiante = (req, res) => {
  const { nombre, correo, edad } = req.body;

  if (!nombre || !correo || edad == null) {
    return res.status(400).json({
      error: "Faltan datos (nombre, correo, edad)"
    });
  }

  const sql = "INSERT INTO estudiantes (nombre, correo, edad) VALUES (?, ?, ?)";

  db.query(sql, [nombre, correo, edad], (err, result) => {
    if (err) {
      console.error("ERROR MYSQL:", err);
      return res.status(500).json({
        error: "Error al crear estudiante",
        detalle: err
      });
    }

    res.status(201).json({
      message: "Estudiante creado correctamente",
      id: result.insertId
    });
  });
};


// =======================
// OBTENER TODOS
// =======================
exports.getEstudiantes = (req, res) => {
  const sql = "SELECT * FROM estudiantes";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al obtener estudiantes"
      });
    }

    res.status(200).json(result);
  });
};


// =======================
// OBTENER POR ID
// =======================
exports.getEstudianteById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM estudiantes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al buscar estudiante"
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: "Estudiante no encontrado"
      });
    }

    res.status(200).json(result[0]);
  });
};


// =======================
// ACTUALIZAR
// =======================
exports.updateEstudiante = (req, res) => {
  const { id } = req.params;
  const { nombre, correo, edad } = req.body;

  if (!nombre || !correo || edad == null) {
    return res.status(400).json({
      error: "Faltan datos (nombre, correo, edad)"
    });
  }

  const sql = "UPDATE estudiantes SET nombre = ?, correo = ?, edad = ? WHERE id = ?";

  db.query(sql, [nombre, correo, edad, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al actualizar estudiante"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Estudiante no encontrado"
      });
    }

    res.status(200).json({
      message: "Estudiante actualizado correctamente"
    });
  });
};


// =======================
// ELIMINAR
// =======================
exports.deleteEstudiante = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM estudiantes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al eliminar estudiante"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Estudiante no encontrado"
      });
    }

    res.status(200).json({
      message: "Estudiante eliminado correctamente"
    });
  });
};