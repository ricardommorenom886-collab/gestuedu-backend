const db = require("../config/db");

// ➕ CREATE CURSO
exports.createCurso = (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no válido" });
    }

    const { nombre, descripcion } = req.body;
    const userId = req.user.id;

    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const sql = "INSERT INTO cursos (nombre, descripcion, user_id) VALUES (?, ?, ?)";

    db.query(sql, [nombre, descripcion || null, userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al crear curso" });
      }

      return res.json({
        message: "Curso creado correctamente",
        id: result.insertId
      });
    });

  } catch (err) {
    return res.status(500).json({ error: "Error interno" });
  }
};


// 🔍 READ TODOS (del usuario logueado)
exports.getCursos = (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no válido" });
    }

    const userId = req.user.id;

    const sql = "SELECT * FROM cursos WHERE user_id = ?";

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al obtener cursos" });
      }

      return res.json(result);
    });

  } catch (err) {
    return res.status(500).json({ error: "Error interno" });
  }
};


// 🔍 READ BY ID
exports.getCursoById = (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no válido" });
    }

    const { id } = req.params;
    const userId = req.user.id;

    const sql = "SELECT * FROM cursos WHERE id = ? AND user_id = ?";

    db.query(sql, [id, userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al obtener curso" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }

      return res.json(result[0]);
    });

  } catch (err) {
    return res.status(500).json({ error: "Error interno" });
  }
};


// ✏️ UPDATE CURSO
exports.updateCurso = (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no válido" });
    }

    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const userId = req.user.id;

    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const sql = "UPDATE cursos SET nombre = ?, descripcion = ? WHERE id = ? AND user_id = ?";

    db.query(sql, [nombre, descripcion || null, id, userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al actualizar curso" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }

      return res.json({ message: "Curso actualizado correctamente" });
    });

  } catch (err) {
    return res.status(500).json({ error: "Error interno" });
  }
};


// ❌ DELETE CURSO
exports.deleteCurso = (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Usuario no válido" });
    }

    const { id } = req.params;
    const userId = req.user.id;

    const sql = "DELETE FROM cursos WHERE id = ? AND user_id = ?";

    db.query(sql, [id, userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al eliminar curso" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }

      return res.json({ message: "Curso eliminado correctamente" });
    });

  } catch (err) {
    return res.status(500).json({ error: "Error interno" });
  }
};
