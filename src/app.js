const express = require("express");
const cors = require("cors");

const app = express();

// ===============================
// 🔹 MIDDLEWARES
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// 🔹 RUTAS
// ===============================
const estudiantesRoutes = require("./routes/estudiantes.routes");
const notasRoutes = require("./routes/notas.routes");
const authRoutes = require("./routes/auth.routes"); // 👈 NUEVO

// ===============================
// 🔹 USO DE RUTAS
// ===============================
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/notas", notasRoutes);
app.use("/api/auth", authRoutes); // 👈 NUEVO

// ===============================
// 🔹 RUTAS DE PRUEBA
// ===============================
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

app.post("/test", (req, res) => {
  res.send("POST funcionando correctamente 🚀");
});

// ===============================
// 🔹 MANEJO DE ERRORES (IMPORTANTE)
// ===============================
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ===============================
// 🚀 INICIAR SERVIDOR
// ===============================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});