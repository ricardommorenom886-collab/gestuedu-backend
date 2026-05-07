const express = require("express");
const router = express.Router();

const controller = require("../controllers/usuarios.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.get("/", verifyToken, controller.getUsuarios);
router.get("/:id", verifyToken, controller.getUsuarioById);
router.post("/", verifyToken, controller.createUsuario);
router.put("/:id", verifyToken, controller.updateUsuario);
router.delete("/:id", verifyToken, controller.deleteUsuario);

module.exports = router;
