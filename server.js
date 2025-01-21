import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = 8082;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
