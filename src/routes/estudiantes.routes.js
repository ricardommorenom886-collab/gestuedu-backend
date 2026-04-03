const express = require("express");
const router = express.Router();

const {
  getEstudiantes,
  createEstudiante,
  updateEstudiante,   // 👈 IMPORTANTE: agrégalo aquí
  deleteEstudiante    // 👈 y este también si ya lo hiciste
} = require("../controllers/estudiantes.controller");

// 🔵 GET (ver)
router.get("/estudiantes", getEstudiantes);

// 🟢 POST (crear)
router.post("/estudiantes", createEstudiante);

// 🟡 PUT (actualizar)
router.put("/estudiantes/:id", updateEstudiante);

// 🔴 DELETE (eliminar)
router.delete("/estudiantes/:id", deleteEstudiante);

module.exports = router;