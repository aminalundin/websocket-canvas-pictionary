// DOMs
const userForm = document.querySelector("#user-form")
const messageForm = document.querySelector("#message-form")
const chat = document.querySelector("#chat")
const userInput = document.querySelector("#user")
const messageInput = document.querySelector("#message")
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



// websocket
// const webSocket = new WebSocket("ws://192.168.0.15:8080");
const webSocket = new WebSocket("http://localhost:8080");

// declare object for chat messages
let objChat = {};

// CANVAS

let isDrawing = false;

// sets pen style
ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);

    // sets up start drawing data object to be sent to websocket
    const data = {
        type: "start",
        x: e.offsetX,
        y: e.offsetY,
    };

    // sends starting drawing data to websocket
    webSocket.send(JSON.stringify(data));
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        // sends object to websocket when player is drawing
        const data = {
            type: "draw",
            x: e.offsetX,
            y: e.offsetY,
        };

        webSocket.send(JSON.stringify(data));
    }
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;

    // sends object to websocket when player has stopped drawing
    const data = {
        type: "stop",
    };
    webSocket.send(JSON.stringify(data));
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false;
});



// EVENT LISTENERS

// user form
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("ok!", userInput.value)

    // prevents user from changing their username 
    userInput.setAttribute("disabled", true)

    // show form and chat
    messageForm.classList = "";

    // active messaging
    messageInput.focus();

    objChat.user = userInput.value;
    
});

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    objChat.message = messageInput.value;
    objChat.time = new Date().toLocaleTimeString();

    // clear input field after message is sent
    messageInput.value = "";

    // call for function to update chat history
    renderChat(objChat)

    // send object to server via websocket
    webSocket.send(JSON.stringify(objChat));
});

webSocket.addEventListener('message', (event) => {
    console.log("event", event)

    const obj = JSON.parse(event.data);
    const data = JSON.parse(event.data);

    if (data.type === "start") {
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
    } else if (data.type === "draw") {
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
    }

    renderChat(obj);
});




// helper functions
/**
 *
 *
 * @param {object} obj
 */
function renderChat(obj) {

    const div = document.createElement("div");

    const span = document.createElement("span");
    span.textContent = obj.user;
    span.classList.add("chat-username")

    const time = document.createElement("span");
    time.textContent = obj.time;
    time.classList.add("chat-message");

    const p = document.createElement("p")
    p.textContent = obj.message;
    p.classList.add("chat-message")


    div.appendChild(span);
    div.appendChild(p);
    div.appendChild(time);

    chat.appendChild(div);

}

renderChat({user: objChat.user, message: objChat.message});
