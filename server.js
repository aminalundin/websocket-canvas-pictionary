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

    // to see number of clients: wss.clients.size
    // to see any closed events:
    // ws.on('close', () => {
    //     console.log("client left")
    // })

    // listen to events, handle all messages as JSON
    ws.on('message', (stream) => {
        const obj = JSON.parse(stream);

        console.log(`${obj.user} says ${obj.message}`)

        // messages than comes through to the server shall be passed on 
        // to any connected clients
        broadcastExclude(wss, ws, obj);

    });
}));

// functions to send chat messages to all or some clients
function broadcast(wss, obj) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(obj));

    });
}

function broadcastExclude(wss, ws, obj) {
    wss.clients.forEach(client => {

        if (client !== ws) {

            client.send(JSON.stringify(obj));
        }
    });
}





server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});