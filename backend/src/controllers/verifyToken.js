const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({
    auth: false,
    message: 'Acceso denegado.'
  });

  const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'FraseSecreta');
  req.usuarioId = payload._id;

  next();
}

module.exports = verifyToken;
