const jwt = require('jsonwebtoken');
const config = require('../../config');

const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) return res.sendStatus(401);
    const bearerToken = bearerHeader.split(' ').pop();
    const payload = jwt.verify(bearerToken, config.secretKey);
    req.usuarioId = payload._id;
    req.rolId = payload._rol;

    next();
  } catch (e) {
    return res.status(401).json(e);
  }
}

module.exports = verifyToken;
