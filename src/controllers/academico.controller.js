const db = require("../config/db");

exports.getRoles = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM roles ORDER BY nombre");
  res.json(rows);
};

exports.getMaterias = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM materias ORDER BY nombre");
  res.json(rows);
};

exports.createMateria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  const [result] = await db.query(
    "INSERT INTO materias (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion || null]
  );

  res.json({ message: "Materia creada", id: result.insertId });
};

exports.updateMateria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  const [result] = await db.query(
    "UPDATE materias SET nombre = ?, descripcion = ? WHERE id = ?",
    [nombre, descripcion || null, req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Materia no encontrada" });
  }

  res.json({ message: "Materia actualizada" });
};

exports.deleteMateria = async (req, res) => {
  const [result] = await db.query("DELETE FROM materias WHERE id = ?", [req.params.id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Materia no encontrada" });
  }

  res.json({ message: "Materia eliminada" });
};

exports.getGrupos = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM grupos ORDER BY periodo, seccion, nombre");
  res.json(rows);
};

exports.createGrupo = async (req, res) => {
  const { nombre, periodo, seccion } = req.body;

  if (!nombre || !periodo || !seccion) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const [result] = await db.query(
    "INSERT INTO grupos (nombre, periodo, seccion) VALUES (?, ?, ?)",
    [nombre, periodo, seccion]
  );

  res.json({ message: "Grupo creado", id: result.insertId });
};

exports.updateGrupo = async (req, res) => {
  const { nombre, periodo, seccion } = req.body;

  const [result] = await db.query(
    "UPDATE grupos SET nombre = ?, periodo = ?, seccion = ? WHERE id = ?",
    [nombre, periodo, seccion, req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Grupo no encontrado" });
  }

  res.json({ message: "Grupo actualizado" });
};

exports.deleteGrupo = async (req, res) => {
  const [result] = await db.query("DELETE FROM grupos WHERE id = ?", [req.params.id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Grupo no encontrado" });
  }

  res.json({ message: "Grupo eliminado" });
};

exports.buscarEstudiantes = async (req, res) => {
  const buscar = "%" + (req.query.buscar || "") + "%";

  const [rows] = await db.query(
    `SELECT *
     FROM estudiantes
     WHERE nombre LIKE ? OR documento LIKE ?
     ORDER BY nombre`,
    [buscar, buscar]
  );

  res.json(rows);
};

exports.getAsignaciones = async (req, res) => {
  const [grupoEstudiantes] = await db.query(
    `SELECT ge.id, ge.grupo_id, ge.estudiante_id, g.nombre AS grupo, e.nombre AS estudiante, e.documento
     FROM grupo_estudiantes ge
     JOIN grupos g ON ge.grupo_id = g.id
     JOIN estudiantes e ON ge.estudiante_id = e.id
     ORDER BY g.nombre, e.nombre`
  );

  const [grupoMaterias] = await db.query(
    `SELECT gm.id, gm.grupo_id, gm.materia_id, g.nombre AS grupo, m.nombre AS materia
     FROM grupo_materias gm
     JOIN grupos g ON gm.grupo_id = g.id
     JOIN materias m ON gm.materia_id = m.id
     ORDER BY g.nombre, m.nombre`
  );

  const [profesorMaterias] = await db.query(
    `SELECT pm.id, pm.profesor_id, pm.grupo_id, pm.materia_id,
            u.nombre AS profesor, g.nombre AS grupo, m.nombre AS materia
     FROM profesor_materias pm
     JOIN usuarios u ON pm.profesor_id = u.id
     JOIN grupos g ON pm.grupo_id = g.id
     JOIN materias m ON pm.materia_id = m.id
     ORDER BY u.nombre, g.nombre, m.nombre`
  );

  res.json({ grupoEstudiantes, grupoMaterias, profesorMaterias });
};

exports.asignarEstudiante = async (req, res) => {
  const { grupo_id, estudiante_id } = req.body;

  await db.query(
    "INSERT IGNORE INTO grupo_estudiantes (grupo_id, estudiante_id) VALUES (?, ?)",
    [grupo_id, estudiante_id]
  );

  res.json({ message: "Estudiante asignado al grupo" });
};

exports.quitarEstudiante = async (req, res) => {
  await db.query("DELETE FROM grupo_estudiantes WHERE id = ?", [req.params.id]);
  res.json({ message: "Asignación eliminada" });
};

exports.asignarMateriaGrupo = async (req, res) => {
  const { grupo_id, materia_id } = req.body;

  await db.query(
    "INSERT IGNORE INTO grupo_materias (grupo_id, materia_id) VALUES (?, ?)",
    [grupo_id, materia_id]
  );

  res.json({ message: "Materia asignada al grupo" });
};

exports.quitarMateriaGrupo = async (req, res) => {
  await db.query("DELETE FROM grupo_materias WHERE id = ?", [req.params.id]);
  res.json({ message: "Asignación eliminada" });
};

exports.asignarProfesorMateria = async (req, res) => {
  const { profesor_id, grupo_id, materia_id } = req.body;

  await db.query(
    "INSERT IGNORE INTO profesor_materias (profesor_id, grupo_id, materia_id) VALUES (?, ?, ?)",
    [profesor_id, grupo_id, materia_id]
  );

  res.json({ message: "Profesor asignado" });
};

exports.quitarProfesorMateria = async (req, res) => {
  await db.query("DELETE FROM profesor_materias WHERE id = ?", [req.params.id]);
  res.json({ message: "Asignación eliminada" });
};

exports.getProfesores = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, nombre, email, dni, rol FROM usuarios WHERE rol = 'profesor' ORDER BY nombre"
  );
  res.json(rows);
};
