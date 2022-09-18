const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const userList = document.getElementById('users');
const input = document.querySelector("input");

const username = document.querySelector("#username").innerHTML;
const room = document.querySelector("#room").innerHTML;

const socket = io();

// Join chatroom
socket.emit("user_join", { username, room });

// Get users in the room
socket.on('roomUsers', (users) => {
  // outputRoomName(room);
  outputUsers(users);
});

// Listen for chat message
socket.on('message', (message) => {
  outputMessage(message);
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


// Message submit
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const msg = input.value;

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("message", msg);

  // Clear input
  input.value = "";
  input.focus();

});

// When a user disconnects
socket.on("user_leave", (user) => {
  outputMessage({ userName: "ChatBot", text: `${user} has left the chat` });
})

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += ` <span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});