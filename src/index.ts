import express from 'express';
import { router } from './routes/routes.js';
import { UpgradeBotbuilder } from './controllers/useControllerUpgrade.js';
import http from 'http';
import { setupBullBoard } from './infrastructure/redis/bullBoard.js';

const app = express();
const port = process.env.port || process.env.PORT || 3978;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

setupBullBoard(app);

const server = http.createServer(app);

server.on('upgrade', UpgradeBotbuilder);

async function startServer() {
    try {
        server.listen(port, () => {
            console.log(`\nBot listening on http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
}

startServer();