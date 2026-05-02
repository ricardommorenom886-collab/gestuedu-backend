const model = require("../models/estudiante.model");

// 🔐 GET - SOLO estudiantes del usuario
exports.getEstudiantes = (req, res) => {
  model.getByUser(req.user.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener estudiantes" });
    }

    res.json(result);
  });
};

// POST
exports.createEstudiante = (req, res) => {
  model.create(req.body, req.user.id, (err, result) => {
    if (err) {
      if (err.message === "Curso no autorizado") {
        return res.status(403).json({ error: err.message });
      }
      return res.status(500).json({ error: "Error al crear estudiante" });
    }

    res.json({ message: "Estudiante creado", id: result.insertId });
  });
};

// PUT
exports.updateEstudiante = (req, res) => {
  model.update(req.params.id, req.body, req.user.id, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al actualizar" });

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "No autorizado" });
    }

    res.json({ message: "Estudiante actualizado" });
  });
};

// DELETE
exports.deleteEstudiante = (req, res) => {
  model.delete(req.params.id, req.user.id, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar" });

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "No autorizado" });
    }

    res.json({ message: "Estudiante eliminado" });
  });
};