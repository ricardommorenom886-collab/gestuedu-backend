const db = require("../config/db");

// 🔵 GET - Obtener todos los estudiantes
exports.getEstudiantes = (req, res) => {
  db.query("SELECT * FROM estudiantes", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error al obtener estudiantes"
      });
    }

    res.json(results);
  });
};

// 🟢 POST - Crear estudiante
exports.createEstudiante = (req, res) => {
  const { nombre, correo, edad } = req.body;

  // 🔴 Validaciones
  if (!nombre || !correo || !edad) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios"
    });
  }

  if (edad < 0) {
    return res.status(400).json({
      message: "Edad inválida"
    });
  }

  const query = "INSERT INTO estudiantes (nombre, correo, edad) VALUES (?, ?, ?)";

  db.query(query, [nombre, correo, edad], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error al crear estudiante"
      });
    }

    res.json({
      message: "Estudiante creado correctamente"
    });
  });
};

// 🟡 PUT - Actualizar estudiante
exports.updateEstudiante = (req, res) => {
  const { id } = req.params;
  const { nombre, correo, edad } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "ID requerido"
    });
  }

  const query = `
    UPDATE estudiantes 
    SET nombre = ?, correo = ?, edad = ?
    WHERE id = ?
  `;

  db.query(query, [nombre, correo, edad, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error al actualizar"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Estudiante no encontrado"
      });
    }

    res.json({
      message: "Estudiante actualizado correctamente"
    });
  });
};

// 🔴 DELETE - Eliminar estudiante
exports.deleteEstudiante = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID requerido"
    });
  }

  const query = "DELETE FROM estudiantes WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error al eliminar"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Estudiante no encontrado"
      });
    }

    res.json({
      message: "Estudiante eliminado correctamente"
    });
  });
};