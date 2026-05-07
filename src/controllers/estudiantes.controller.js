const model = require("../models/estudiante.model");

// GET ALL
exports.getEstudiantes = async (req, res) => {
  try {
    const data = await model.getAll(req.user.id);

    if (req.user.rol === "estudiante" && req.user.dni) {
      return res.json(data.filter(e => e.documento === req.user.dni));
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
};

// GET BY ID ⭐ (TE FALTABA ESTO)
exports.getEstudianteById = async (req, res) => {
  try {
    const data = await model.getById(req.params.id, req.user.id);

    if (!data) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener estudiante" });
  }
};

// CREATE
exports.createEstudiante = async (req, res) => {
  try {
    const { nombre, documento, correo, edad, usuario_id } = req.body;

    if (!nombre || !documento || !correo || !edad) {
      return res.status(400).json({
        error: "Faltan campos obligatorios"
      });
    }

    const result = await model.create({
      nombre,
      documento,
      correo,
      edad,
      usuario_id
    });

    res.json({
      message: "Estudiante creado correctamente",
      id: result.insertId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Error al crear estudiante"
    });
  }
};

// UPDATE
exports.updateEstudiante = async (req, res) => {
  try {
    const result = await model.update(req.params.id, req.body, req.user.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No encontrado" });
    }

    res.json({ message: "Actualizado correctamente" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar" });
  }
};

// DELETE
exports.deleteEstudiante = async (req, res) => {
  try {
    const result = await model.remove(req.params.id, req.user.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No encontrado" });
    }

    res.json({ message: "Eliminado correctamente" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar" });
  }
};
