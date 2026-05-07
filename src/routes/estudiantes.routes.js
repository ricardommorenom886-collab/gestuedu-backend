const express = require("express");
const router = express.Router();

const controller = require("../controllers/estudiantes.controller");
const verifyToken = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

// 🔍 VER TODOS
router.get(
  "/",
  verifyToken,
  allowRoles("admin", "user", "usuario", "profesor", "estudiante"),
  controller.getEstudiantes
);

// 🔍 VER POR ID ⭐ (TE FALTABA ESTA RUTA)
router.get(
  "/:id",
  verifyToken,
  allowRoles("admin", "user", "usuario", "profesor", "estudiante"),
  controller.getEstudianteById
);

// ➕ CREAR
router.post(
  "/",
  verifyToken,
  allowRoles("admin", "user", "usuario", "profesor"),
  controller.createEstudiante
);

// ✏️ ACTUALIZAR
router.put(
  "/:id",
  verifyToken,
  allowRoles("admin", "user", "usuario", "profesor"),
  controller.updateEstudiante
);

// ❌ ELIMINAR
router.delete(
  "/:id",
  verifyToken,
  allowRoles("admin", "user", "usuario", "profesor"),
  controller.deleteEstudiante
);

module.exports = router;
