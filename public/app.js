// DOMs
const userForm = document.querySelector("#user-form")
const messageForm = document.querySelector("#message-form")
const chat = document.querySelector("#chat")
const userInput = document.querySelector("#user")
const messageInput = document.querySelector("#message")

// application dependencies


// websocket
const webSocket = new WebSocket("ws://192.168.0.15:8080");

// declare object for chat messages
let objChat = {};

// event listeners

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

    const p = document.createElement("p")
    p.textContent = obj.message;


    div.appendChild(span);
    div.appendChild(p);

    chat.appendChild(div);

}

renderChat({user: objChat.user, message: objChat.message});
