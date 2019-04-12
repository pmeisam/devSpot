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



    socket.on('create-chat', async function({token, users}){
      // console.log('users in chat room are: ', users);
      const user = await validateToken(token);
      if (!user) return;
      const chat = await Chat.findChatOrCreateOne(users)
      chats[chat._id] = chat;
      socket.join(chat._id, function(){
        io.to(chat._id).emit('update-chat', chat);
      })
    })
    socket.on('send-text', async function({token, idx}) {
      const user = await validateToken(token);
      if(!user) return;
      let chat = findChatInMemory(user);
      io.to(chat._id).emit('update-chat', chat);
      chat.save();
    })






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
  let chatsArr = Object.values(chats);
  console.log(chatsArr);
  // const chat = chatsArr.find(g => g.users.some(p => p._id == user._id));
  // return chat;
}