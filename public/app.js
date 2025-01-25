console.log("hello")

const webSocket = new WebSocket("ws://localhost:8080");

setTimeout(() => {

    let msg = {
        type: "chat",
        message: "hello world"
    }

    // send message to server
    webSocket.send(JSON.stringify(msg));
    console.log("message sent to server")
}, 5000);