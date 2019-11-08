const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('auth');
    if (!token) return res.status(401).json({
      auth: false,
      message: 'Acceso denegado.'
    });

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'FraseSecreta');
    req.usuarioId = payload._id;
    req.rolId = payload._rol;

    next();
  } catch (e) {
    return res.status(401).json(e);
  }
}

module.exports = verifyToken;
