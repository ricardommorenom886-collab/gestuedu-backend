const API_URL = "http://localhost:3000/api";

// 🔐 obtener token
function getToken() {
  return localStorage.getItem("token");
}

// 🔑 LOGIN
async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return res.json();
}

// 📚 GET estudiantes
async function getEstudiantes() {
  const res = await fetch(`${API_URL}/estudiantes`, {
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });

  return res.json();
}

// ➕ CREAR estudiante
async function crearEstudiante(data) {
  const res = await fetch(`${API_URL}/estudiantes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

// ✏️ UPDATE
async function actualizarEstudiante(id, data) {
  const res = await fetch(`${API_URL}/estudiantes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

// ❌ DELETE
async function eliminarEstudiante(id) {
  const res = await fetch(`${API_URL}/estudiantes/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + getToken()
    }
  });

  return res.json();
}