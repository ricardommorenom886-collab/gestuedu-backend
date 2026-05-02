const db = require("../config/db");

// ======================
// 📊 DASHBOARD GENERAL
// ======================
exports.getDashboard = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      COUNT(DISTINCT e.id) AS total_estudiantes,
      COUNT(n.id) AS total_notas,
      IFNULL(AVG(n.nota), 0) AS promedio_general
    FROM cursos c
    LEFT JOIN estudiantes e ON c.id = e.curso_id
    LEFT JOIN notas n ON e.id = n.estudiante_id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener dashboard" });
    }

    res.json(result[0]);
  });
};

// ======================
// 🏆 TOP ESTUDIANTES
// ======================
exports.getTopEstudiantes = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      e.id,
      e.nombre,
      IFNULL(AVG(n.nota), 0) AS promedio
    FROM estudiantes e
    JOIN cursos c ON e.curso_id = c.id
    LEFT JOIN notas n ON e.id = n.estudiante_id
    WHERE c.user_id = ?
    GROUP BY e.id
    ORDER BY promedio DESC
    LIMIT 5
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener top estudiantes" });
    }

    res.json(result);
  });
};

// ======================
// 📉 MATERIAS CON BAJO PROMEDIO
// ======================
exports.getMateriasBajas = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      n.materia,
      IFNULL(AVG(n.nota), 0) AS promedio
    FROM notas n
    JOIN estudiantes e ON n.estudiante_id = e.id
    JOIN cursos c ON e.curso_id = c.id
    WHERE c.user_id = ?
    GROUP BY n.materia
    ORDER BY promedio ASC
    LIMIT 5
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener materias bajas" });
    }

    res.json(result);
  });
};

// ======================
// 📈 PROMEDIO GENERAL
// ======================
exports.getPromedioGeneral = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      IFNULL(AVG(n.nota), 0) AS promedio
    FROM notas n
    JOIN estudiantes e ON n.estudiante_id = e.id
    JOIN cursos c ON e.curso_id = c.id
    WHERE c.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener promedio general" });
    }

    res.json(result[0]);
  });
};