const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // guarda os dados do usuário para as próximas etapas
        next(); // deixa a requisição continuar para a rota
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
}

module.exports = verifyToken;