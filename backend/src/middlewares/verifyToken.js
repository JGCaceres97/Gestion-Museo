const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) return res.sendStatus(401);
    const bearerToken = bearerHeader.split(' ').pop();
    const payload = jwt.verify(bearerToken, secretKey);
    req.usuario = payload._usuario;
    req.permisos = payload._permisos;

    next();
  } catch (e) {
    return res.status(401).json(e);
  }
};

module.exports = verifyToken;
