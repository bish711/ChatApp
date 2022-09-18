let users = [];

// add user to chat
module.exports.addUser = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);
    return user;
}

// get current user
module.exports.getCurrentUser = (id) => {
    return users.find(user => user.id === id);
}

// user leaves chat
module.exports.userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// get room users
module.exports.getRoomUsers = (room) => {
    const usersList = users.filter(user => user.room === room);
    return usersList.map(user => user.username);
}

// // to add user to specific room
// module.exports.addUser = function (id, room, username) {
//     for (let r of rooms) {
//         if (r.name === room) {
//             r.users.push({ id, username });
//             return 0;
//         }
//     }
//     rooms.push({ name: room, users: [{ id, username }] });
// };

// // get current user
// module.exports.getUser = (id, room) => {
//     const index = rooms.findIndex(r => r.name === room);
//     const i = rooms[index].users.findIndex(u => u.id === id);
//     return
// }


// // to return array of users in the room
// module.exports.getRoomUsers = function (room) {
//     for (let r of rooms) {
//         if (r.name === room)
//             return r.users;
//     }
// };

// // when user leaves chat room
// module.exports.userLeave = (id, room) => {
//     const index = rooms.findIndex(r => r.name === room);
//     const i = rooms[index].users.findIndex(u => u.id === id);
//     if (i != -1) {
//         return rooms[index].users.splice(i, 1);
//     }
// }