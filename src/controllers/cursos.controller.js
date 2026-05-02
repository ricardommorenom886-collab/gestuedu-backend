const db = require("../config/db");

// crear curso
exports.createCurso = (req, res) => {
  const { nombre } = req.body;

  const sql = "INSERT INTO cursos (nombre, user_id) VALUES (?, ?)";

  db.query(sql, [nombre, req.user.id], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear curso" });
    }

    res.json({ message: "Curso creado correctamente" });
  });
};

// obtener cursos del usuario
exports.getCursos = (req, res) => {
  const sql = "SELECT * FROM cursos WHERE user_id = ?";

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener cursos" });
    }

    res.json(result);
  });
};