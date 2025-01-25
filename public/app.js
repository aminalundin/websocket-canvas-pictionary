// DOMs
const userForm = document.querySelector("#user-form")
const messageForm = document.querySelector("#message-form")
const chat = document.querySelector("#chat")
const userInput = document.querySelector("#user")
const messageInput = document.querySelector("#message")

// websocket
const webSocket = new WebSocket("ws://localhost:8080");

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
    
});








// setTimeout(() => {
    
    // let msg = {
    //     type: "chat",
    //     message: "hello world"
    // }

    
//     webSocket.send(JSON.stringify(msg));
//     console.log("message sent to server")
// }, 5000);