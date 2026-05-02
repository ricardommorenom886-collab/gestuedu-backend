const express = require("express");
const router = express.Router();

const controller = require("../controllers/cursos.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/", verifyToken, controller.createCurso);
router.get("/", verifyToken, controller.getCursos);

module.exports = router;