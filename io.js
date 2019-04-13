const jwt = require("jsonwebtoken");
const Chat = require("./models/chat");
let io;

const chats = {};

module.exports = {
  init,
  getIo
};

function init(http) {
  io = require("socket.io")(http);
  io.on("connection", function(socket) {
    console.log("connected to socket.io");

    socket.on("new-message", async function({ content, id, token }) {
      const chat = await Chat.findById(id).populate("users");
      const user = await validateToken(token);
      if (!user) return;
      const authorized = chat.users.map(u => u.id).includes(user._id);
      if (authorized) {
        chat.messages.push({
          content: content,
          user: user._id,
          userName: user.user_name
        });
        await chat.save();
        socket.join(chat._id, function() {
          io.to(chat._id).emit("new-message", chat);
        });
      } else {
        socket.join(`unauthorized-user`, function() {
          io.to(`unauthorized-user`).emit("unauthorized-user");
        });
      }
    });

    socket.on("get-active", async function(token) {
      const user = await validateToken(token);
      if (!user) return;
      let chat = findChatInMemory(user);
      // Active chat not in memory, check db just in case
      // if (!chat) chat = await Chat.getActiveForUser(user);
      if (chat) {
        socket.join(chat._id, function() {
          chats[chat._id] = chat;
          io.to(chat._id).emit("update-chat", chat);
        });
      }
    });
    socket.on("logout", async function(token) {
      const user = await validateToken(token);
      if (!user) return;
      let chat = findChatInMemory(user);
      if (!chat) chat = await Chat.getActiveForUser(user);
      if (chat) {
        socket.leave(chat._id, function() {
          const player = chat.players.find(p => p.playerId.equals(user._id));
          chat.players.remove(player._id);
          if (!chat.players.length) {
            delete chats[chat._id];
            Chat.findByIdAndDelete(chat._id).exec();
          }
        });
      }
    });
  });
}

function getIo() {
  return io;
}

function validateToken(token) {
  return new Promise(function(resolve) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) resolve(false);
      resolve(decoded.user);
    });
  });
}
function findChatInMemory(user) {
  // console.log('chats ', chats)
  let chatsArr = Object.values(chats);
  // console.log('chatsArr: ', chatsArr);
  const chat = chatsArr.find(g => g.users.some(p => p._id == user._id));
  console.log("chat: ", chat);
  return chat;
}
