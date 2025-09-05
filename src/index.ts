import express from 'express';
import { router } from './routes/routes';
import { UpgradeBotbuilder } from './controllers/useControllerUpgrade';
import http from 'http';

const app = express();
const port = process.env.port || process.env.PORT || 3978;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const server = http.createServer(app);

server.on('upgrade', UpgradeBotbuilder);

server.listen(port, () => {
    console.log(`\nBot listening on http://localhost:${port}`);
});