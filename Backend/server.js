require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('./config/passport');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');
const http = require('http');
const { Server } = require('socket.io');

const citiesRoutes = require('./routes/cities');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});
const PORT = process.env.PORT || 5000;
const logger = require('./middleware/logger');


// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(passport.initialize());


// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'Weather Forecast & Alert System API is running' });
});

// Rotas
app.use('/api/cities', citiesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.all('/graphql', createHandler({ schema, rootValue: root }));
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Simula um alerta de clima a cada 15 segundos
setInterval(() => {
    const alerts = [
        'Heavy rain expected in Maputo',
        'Strong winds warning in Lisboa',
        'Heatwave alert in Tokyo'
    ];
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    io.emit('weatherAlert', { message: randomAlert, time: new Date().toISOString() });
}, 15000);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});