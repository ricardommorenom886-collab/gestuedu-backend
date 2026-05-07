const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.rol) {
      return res.status(403).json({ error: "Rol no definido" });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ error: "No autorizado" });
    }

    next();
  };
};

module.exports = allowRoles;
