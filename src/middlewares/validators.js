const { body, validationResult } = require("express-validator");

exports.validateEstudiante = [
  body("nombre").notEmpty().withMessage("Nombre requerido"),
  body("correo").isEmail().withMessage("Correo inválido"),
  body("edad").isInt({ min: 5, max: 100 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateCurso = [
  body("nombre").notEmpty().withMessage("Nombre requerido"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];