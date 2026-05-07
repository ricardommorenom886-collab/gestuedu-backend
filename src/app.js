const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/estudiantes", require("./routes/estudiantes.routes"));
app.use("/api/cursos", require("./routes/cursos.routes"));
app.use("/api/notas", require("./routes/notas.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/academico", require("./routes/academico.routes"));

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
