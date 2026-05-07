const express = require("express");
const router = express.Router();

const controller = require("../controllers/academico.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.get("/roles", verifyToken, controller.getRoles);

router.get("/materias", verifyToken, controller.getMaterias);
router.post("/materias", verifyToken, controller.createMateria);
router.put("/materias/:id", verifyToken, controller.updateMateria);
router.delete("/materias/:id", verifyToken, controller.deleteMateria);

router.get("/grupos", verifyToken, controller.getGrupos);
router.post("/grupos", verifyToken, controller.createGrupo);
router.put("/grupos/:id", verifyToken, controller.updateGrupo);
router.delete("/grupos/:id", verifyToken, controller.deleteGrupo);

router.get("/profesores", verifyToken, controller.getProfesores);
router.get("/buscar-estudiantes", verifyToken, controller.buscarEstudiantes);

router.get("/asignaciones", verifyToken, controller.getAsignaciones);
router.post("/asignar-estudiante", verifyToken, controller.asignarEstudiante);
router.delete("/asignar-estudiante/:id", verifyToken, controller.quitarEstudiante);
router.post("/asignar-materia-grupo", verifyToken, controller.asignarMateriaGrupo);
router.delete("/asignar-materia-grupo/:id", verifyToken, controller.quitarMateriaGrupo);
router.post("/asignar-profesor-materia", verifyToken, controller.asignarProfesorMateria);
router.delete("/asignar-profesor-materia/:id", verifyToken, controller.quitarProfesorMateria);

module.exports = router;
