const express = require("express");
const router = express.Router();

const controller = require("../controllers/estudiantes.controller");
const verifyToken = require("../middlewares/auth.middleware");

// 👇 RUTAS
router.get("/", verifyToken, controller.getEstudiantes);
router.post("/", verifyToken, controller.createEstudiante);
router.put("/:id", verifyToken, controller.updateEstudiante);
router.delete("/:id", verifyToken, controller.deleteEstudiante);

module.exports = router;