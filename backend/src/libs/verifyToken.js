const jwt = require('jsonwebtoken');

const TokenValidation = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json('Acceso denegado.');

  const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'FraseSecreta');
  req.usuarioId = payload._id;

  next();
}

module.exports = TokenValidation;
