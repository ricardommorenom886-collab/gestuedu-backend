const db = require("../config/db");

// ======================
// GET con promedio
// ======================
exports.getByUser = (userId, callback) => {
  const sql = `
    SELECT 
      e.id,
      e.nombre,
      e.correo,
      e.edad,
      e.curso_id,
      IFNULL(AVG(n.nota), 0) AS promedio
    FROM estudiantes e
    JOIN cursos c ON e.curso_id = c.id
    LEFT JOIN notas n ON e.id = n.estudiante_id
    WHERE c.user_id = ?
    GROUP BY e.id
  `;

  db.query(sql, [userId], callback);
};

// ======================
// CREATE
// ======================
exports.create = (data, userId, callback) => {
  const { nombre, correo, edad, curso_id } = data;

  const checkSql = `
    SELECT * FROM cursos
    WHERE id = ? AND user_id = ?
  `;

  db.query(checkSql, [curso_id, userId], (err, result) => {
    if (err) return callback(err);

    if (result.length === 0) {
      return callback(new Error("Curso no autorizado"));
    }

    const sql = `
      INSERT INTO estudiantes (nombre, correo, edad, curso_id)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nombre, correo, edad, curso_id], callback);
  });
};

// ======================
// UPDATE
// ======================
exports.update = (id, data, userId, callback) => {
  const { nombre, correo, edad } = data;

  const sql = `
    UPDATE estudiantes e
    JOIN cursos c ON e.curso_id = c.id
    SET e.nombre=?, e.correo=?, e.edad=?
    WHERE e.id=? AND c.user_id=?
  `;

  db.query(sql, [nombre, correo, edad, id, userId], callback);
};

// ======================
// DELETE
// ======================
exports.delete = (id, userId, callback) => {
  const sql = `
    DELETE e
    FROM estudiantes e
    JOIN cursos c ON e.curso_id = c.id
    WHERE e.id=? AND c.user_id=?
  `;

  db.query(sql, [id, userId], callback);
};