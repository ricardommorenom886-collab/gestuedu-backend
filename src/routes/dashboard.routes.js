const express = require("express");
const router = express.Router();

// 🔐 Middleware de autenticación
const verifyToken = require("../middlewares/auth.middleware");

// 🎯 Controller
const dashboardController = require("../controllers/dashboard.controller");

// ======================
// 📊 DASHBOARD GENERAL
// ======================
router.get("/", verifyToken, dashboardController.getDashboard);

// ======================
// 🏆 MEJORES ESTUDIANTES
// ======================
router.get("/top-estudiantes", verifyToken, dashboardController.getTopEstudiantes);

// ======================
// 📉 MATERIAS CON BAJO RENDIMIENTO
// ======================
router.get("/materias-bajas", verifyToken, dashboardController.getMateriasBajas);

// ======================
// 📈 PROMEDIO GENERAL
// ======================
router.get("/promedio-general", verifyToken, dashboardController.getPromedioGeneral);

module.exports = router;