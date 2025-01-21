import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = 8080;

app.use(express.static("public"));

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});