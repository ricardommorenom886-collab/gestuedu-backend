const db = require("../config/db");

// =======================
// CREAR NOTA
// =======================
exports.createNota = (req, res) => {
  const { estudiante_id, materia, nota } = req.body;

  if (!estudiante_id || !materia || nota == null) {
    return res.status(400).json({
      error: "Faltan datos obligatorios (estudiante_id, materia, nota)"
    });
  }

  // 🔹 Validar que el estudiante exista
  const checkSql = "SELECT id FROM estudiantes WHERE id = ?";
  db.query(checkSql, [estudiante_id], (err, rows) => {
    if (err) {
      console.error("ERROR MYSQL:", err);
      return res.status(500).json({ error: "Error en validación" });
    }

    if (rows.length === 0) {
      return res.status(404).json({
        error: "El estudiante no existe"
      });
    }

    // 🔹 Insertar nota
    const insertSql = "INSERT INTO notas (estudiante_id, materia, nota) VALUES (?, ?, ?)";
    db.query(insertSql, [estudiante_id, materia, nota], (err, result) => {
      if (err) {
        console.error("ERROR MYSQL:", err);
        return res.status(500).json({
          error: "Error al crear nota",
          detalle: err
        });
      }

      res.status(201).json({
        message: "Nota creada correctamente",
        id: result.insertId
      });
    });
  });
};


// =======================
// OBTENER TODAS LAS NOTAS
// =======================
exports.getNotas = (req, res) => {
  const sql = `
    SELECT n.id, n.materia, n.nota, e.nombre AS estudiante
    FROM notas n
    JOIN estudiantes e ON n.estudiante_id = e.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("ERROR MYSQL:", err);
      return res.status(500).json({
        error: "Error al obtener notas"
      });
    }

    res.status(200).json(result);
  });
};


// =======================
// OBTENER NOTA POR ID
// =======================
exports.getNotaById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT n.id, n.materia, n.nota, e.nombre AS estudiante
    FROM notas n
    JOIN estudiantes e ON n.estudiante_id = e.id
    WHERE n.id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al buscar nota"
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: "Nota no encontrada"
      });
    }

    res.status(200).json(result[0]);
  });
};


// =======================
// ACTUALIZAR NOTA
// =======================
exports.updateNota = (req, res) => {
  const { id } = req.params;
  const { materia, nota } = req.body;

  if (!materia || nota == null) {
    return res.status(400).json({
      error: "Faltan datos (materia, nota)"
    });
  }

  const sql = "UPDATE notas SET materia = ?, nota = ? WHERE id = ?";

  db.query(sql, [materia, nota, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al actualizar"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Nota no encontrada"
      });
    }

    res.status(200).json({
      message: "Nota actualizada correctamente"
    });
  });
};


// =======================
// ELIMINAR NOTA
// =======================
exports.deleteNota = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM notas WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error al eliminar"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Nota no encontrada"
      });
    }

    res.status(200).json({
      message: "Nota eliminada correctamente"
    });
  });
};