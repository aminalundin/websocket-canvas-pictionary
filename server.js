import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

// express server
const app = express();
const PORT = 8080;

// express using the folder public as primary resource
app.use(express.static("public"));

// http wrapper for express
const server = http.createServer(app);

// start websocket server
const wss = new WebSocketServer({ noServer: true })

// ensure websocket communication
server.on('upgrade', (req, socket, head) => {
    console.log("client upgrade")
    
    // verify what is needed for websocket communication
    // return;
    

    wss.handleUpgrade(req, socket, head, (ws) => {

        // pass websocket communication
        wss.emit('connection', ws, req);
        console.log("client connected")
    });
});

// listen to websocket events
wss.on('connection', (ws => {
    console.log(`new client connection`)

    // listen to events, handle all messages as JSON
    ws.on('message', (stream) => {
        const obj = JSON.parse(stream);

        console.log(obj.message)
    })
}))





server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});