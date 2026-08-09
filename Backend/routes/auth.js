const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// "Base de dados" de usuários em memória (por enquanto)
// Senha real: "123456" (já encriptada abaixo)
let users = [
    {
        id: 1,
        username: 'demo',
        password: '$2a$10$CwTycUXWue0Thq9StjUM0uJ8gK1M0M6L.qC7g8mFqLtxq7t7dQ6Cq' // "123456"
    }
];

// REGISTER - criar novo usuário
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now(),
        username,
        password: hashedPassword
    };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
});

// LOGIN - autenticar e gerar token JWT
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    res.json({ token });
});
// GOOGLE OAUTH - inicia o login com Google
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// GOOGLE OAUTH - callback depois do usuário autorizar
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
    (req, res) => {
        // Gera um token JWT para o usuário autenticado via Google
        const token = jwt.sign(
            { id: req.user.id, username: req.user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Google login successful',
            user: req.user,
            token
        });
    }
);

module.exports = router;