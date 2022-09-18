
const socket = io();

const form = document.querySelector("form");
const input = document.querySelector(".input");
const messages = document.querySelector(".messages");
// const username = prompt("Please enter a username: ", "");
const username = document.querySelector("#username").innerHTML;
const room = document.querySelector("#room").innerHTML;
// addMessage("You have joined the chat as '" + username + "'.");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    addMessage(username + ": " + input.value);

    socket.emit("send_message", { room, username, message: input.value });

    input.value = "";
    return false;
}, false);

socket.emit("user_join", { username, room });

socket.on("receive_message", function (data) {
    addMessage(data.username + ": " + data.message);
});

socket.on("user_join", function (data) {
    addMessage(data.username + " just joined the chat!");
});

socket.on("user_leave", function (data) {
    addMessage(data + " has left the chat.");
});




function addMessage(message) {
    const li = document.createElement("li");
    li.innerHTML = message;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
}


