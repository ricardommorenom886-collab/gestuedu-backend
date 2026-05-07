const db = require("../config/db");

async function profesorPuede(profesorId, grupoId, materiaId) {
  const [rows] = await db.query(
    `SELECT id
     FROM profesor_materias
     WHERE profesor_id = ? AND grupo_id = ? AND materia_id = ?`,
    [profesorId, grupoId, materiaId]
  );

  return rows.length > 0;
}

async function estudianteEnGrupo(estudianteId, grupoId) {
  const [rows] = await db.query(
    "SELECT id FROM grupo_estudiantes WHERE estudiante_id = ? AND grupo_id = ?",
    [estudianteId, grupoId]
  );

  return rows.length > 0;
}

async function materiaEnGrupo(materiaId, grupoId) {
  const [rows] = await db.query(
    "SELECT id FROM grupo_materias WHERE materia_id = ? AND grupo_id = ?",
    [materiaId, grupoId]
  );

  return rows.length > 0;
}

exports.createNota = async (req, res) => {
  try {
    const { estudiante_id, grupo_id, materia_id, nota, observacion } = req.body;

    if (!estudiante_id || !grupo_id || !materia_id || nota == null) {
      return res.status(400).json({
        error: "Faltan datos (estudiante, grupo, materia, nota)"
      });
    }

    if (!(await estudianteEnGrupo(estudiante_id, grupo_id))) {
      return res.status(400).json({ error: "El estudiante no pertenece a ese grupo" });
    }

    if (!(await materiaEnGrupo(materia_id, grupo_id))) {
      return res.status(400).json({ error: "La materia no pertenece a ese grupo" });
    }

    if (req.user.rol === "profesor") {
      const puede = await profesorPuede(req.user.id, grupo_id, materia_id);

      if (!puede) {
        return res.status(403).json({ error: "Profesor no asignado a esa materia/grupo" });
      }
    }

    const profesorId = req.user.rol === "profesor" ? req.user.id : null;

    const [result] = await db.query(
      `INSERT INTO notas (estudiante_id, grupo_id, materia_id, profesor_id, nota, fecha, observacion)
       VALUES (?, ?, ?, ?, ?, CURDATE(), ?)`,
      [estudiante_id, grupo_id, materia_id, profesorId, nota, observacion || null]
    );

    res.json({ message: "Nota creada correctamente", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear nota" });
  }
};

exports.getNotas = async (req, res) => {
  try {
    let sql = `
      SELECT n.id, n.estudiante_id, n.grupo_id, n.materia_id, n.profesor_id,
             n.nota, n.fecha, n.observacion,
             e.nombre AS estudiante, e.documento,
             g.nombre AS grupo, g.periodo, g.seccion,
             m.nombre AS materia,
             u.nombre AS profesor
      FROM notas n
      JOIN estudiantes e ON n.estudiante_id = e.id
      JOIN grupos g ON n.grupo_id = g.id
      JOIN materias m ON n.materia_id = m.id
      LEFT JOIN usuarios u ON n.profesor_id = u.id
    `;

    const params = [];

    if (req.user.rol === "estudiante") {
      sql += " WHERE e.documento = ?";
      params.push(req.user.dni);
    }

    if (req.user.rol === "profesor") {
      sql += ` WHERE EXISTS (
        SELECT 1 FROM profesor_materias pm
        WHERE pm.profesor_id = ? AND pm.grupo_id = n.grupo_id AND pm.materia_id = n.materia_id
      )`;
      params.push(req.user.id);
    }

    sql += " ORDER BY g.nombre, m.nombre, e.nombre";

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener notas" });
  }
};

exports.getNotaById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notas WHERE id = ?", [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar nota" });
  }
};

exports.updateNota = async (req, res) => {
  try {
    const { estudiante_id, grupo_id, materia_id, nota, observacion } = req.body;

    if (!estudiante_id || !grupo_id || !materia_id || nota == null) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    if (req.user.rol === "profesor") {
      const puede = await profesorPuede(req.user.id, grupo_id, materia_id);

      if (!puede) {
        return res.status(403).json({ error: "Profesor no asignado a esa materia/grupo" });
      }
    }

    const [result] = await db.query(
      `UPDATE notas
       SET estudiante_id = ?, grupo_id = ?, materia_id = ?, nota = ?, observacion = ?
       WHERE id = ?`,
      [estudiante_id, grupo_id, materia_id, nota, observacion || null, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    res.json({ message: "Nota actualizada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar nota" });
  }
};

exports.deleteNota = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM notas WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    res.json({ message: "Nota eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar nota" });
  }
};
