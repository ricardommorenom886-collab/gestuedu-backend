const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// 🔥 prueba básica (para confirmar que el servidor responde)
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.post("/test", (req, res) => {
  res.send("Funciona POST");
});

// 🔥 cargar rutas correctamente (sin errores de ruta)
const estudiantesRoutes = require(path.join(__dirname, "routes/estudiantes.routes"));
app.use("/api", estudiantesRoutes);

// 🚀 iniciar servidor (SIEMPRE AL FINAL)
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});