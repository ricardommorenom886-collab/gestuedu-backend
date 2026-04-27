const express = require("express");
const router = express.Router();

const controller = require("../controllers/notas.controller");
const { verifyToken } = require("../middlewares/auth.middleware"); // 👈 IMPORTANTE

// ===============================
// 🔐 RUTAS PROTEGIDAS CON AUTH
// ===============================
router.post("/", verifyToken, controller.createNota);
router.get("/", verifyToken, controller.getNotas);

// ===============================
// 🔹 OTRAS RUTAS (también puedes protegerlas si quieres)
// ===============================
router.get("/:id", verifyToken, controller.getNotaById);
router.put("/:id", verifyToken, controller.updateNota);
router.delete("/:id", verifyToken, controller.deleteNota);

module.exports = router;