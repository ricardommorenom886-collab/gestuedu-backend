const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// CONFIGURACIONES
// ======================
app.use(cors());
app.use(express.json());

// ======================
// IMPORTAR RUTAS
// ======================
const authRoutes = require("./routes/auth.routes");
const estudiantesRoutes = require("./routes/estudiantes.routes");
const cursosRoutes = require("./routes/cursos.routes");
const notasRoutes = require("./routes/notas.routes");

// 👉 LO QUE TE PIDIERON (AQUÍ VA)
const dashboardRoutes = require("./routes/dashboard.routes");

// ======================
// USAR RUTAS
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/notas", notasRoutes);

// 👉 Y AQUÍ TAMBIÉN
app.use("/api/dashboard", dashboardRoutes);

// ======================
// RUTA TEST
// ======================
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// ======================
// SERVIDOR
// ======================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});