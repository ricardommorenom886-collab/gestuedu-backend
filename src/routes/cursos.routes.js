const express = require("express");
const router = express.Router();

const controller = require("../controllers/cursos.controller");
const verifyToken = require("../middlewares/auth.middleware");

// ➕ CREATE
router.post("/", verifyToken, controller.createCurso);

// 🔍 READ ALL
router.get("/", verifyToken, controller.getCursos);

// 🔍 READ ONE
router.get("/:id", verifyToken, controller.getCursoById);

// ✏️ UPDATE
router.put("/:id", verifyToken, controller.updateCurso);

// ❌ DELETE
router.delete("/:id", verifyToken, controller.deleteCurso);

module.exports = router;