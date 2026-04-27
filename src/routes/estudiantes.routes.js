const express = require("express");
const router = express.Router();
const controller = require("../controllers/estudiantes.controller");

router.post("/", controller.createEstudiante);
router.get("/", controller.getEstudiantes);
router.get("/:id", controller.getEstudianteById);
router.put("/:id", controller.updateEstudiante);
router.delete("/:id", controller.deleteEstudiante);

module.exports = router;